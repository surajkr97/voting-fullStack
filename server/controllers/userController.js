const User = require("../models/user");
const { generateToken } = require("../jwt");
const sendEmail = require("../utils/mailer");
const bcrypt = require("bcrypt");

// @desc   signup
exports.signup = async (req, res) => {
  try {
    if (req.body.role === "admin") {
      const existingAdmin = await User.findOne({ role: "admin" });
      if (existingAdmin) {
        return res.status(400).json({ error: "An admin already exists." });
      }
    }

    // Hash password
    // req.body.password = await bcrypt.hash(req.body.password, 10);

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new User(req.body);
    newUser.otp = otp;
    newUser.isVerified = false;

    const response = await newUser.save();

    // Send the OTP to the user's email
    const htmlContent = `
      <h2>Voting App OTP Verification</h2>
      <p>Your One-Time Password is: <strong>${otp}</strong></p>
      <p>This code will expire shortly. Do not share it with anyone.</p>
    `;

    await sendEmail(
      response.email,
      "Verify your Voting App account",
      htmlContent
    );

    // Generate JWT token
    const payload = { id: response.id };
    const token = generateToken(payload);

    res.status(200).json({
      response,
      token,
      message: "Signup successful! Verification email sent.",
    });
  } catch (error) {
    if (error.code === 11000) {
      const dup = Object.keys(error.keyValue)[0];
      return res
        .status(400)
        .json({ error: `The ${dup} you entered is already in use.` });
    }
    res.status(500).json({ error: "Unexpected error occurred" });
  }
};

// @desc   verifyOtp
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // 1. Find the user by their email
    const user = await User.findOne({ email });

    // 2. Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // 3. Compare the provided OTP with the one stored in the user document
    if (user.otp !== otp) {
      // Make sure 'otp' is a field in your User schema
      return res.status(400).json({ message: "Invalid OTP." });
    }

    // 4. Optionally, check for OTP expiration
    // You would need to store the OTP expiration time in your schema
    // if (user.otpExpiresAt < Date.now()) {
    //     return res.status(400).json({ message: "OTP has expired." });
    // }

    // 5. If the OTP is correct, update the user's status
    user.isVerified = true;
    user.otp = null; // Clear the OTP to prevent reuse
    await user.save();

    res.status(200).json({
      message: "OTP verified successfully. Your account is now active!",
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc   login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Debugging Step 1: Check the incoming data
    console.log("Login attempt for email:", email);
    console.log("Password entered:", password);

    const user = await User.findOne({ email });

    // 1. Check if user exists and password is correct
    if (!user) {
      console.log("User not found with this email.");
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // 2. Check if the password is correct
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      console.log("Password does not match for user:", email);
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // 3. Add this crucial check for account verification
    if (!user.isVerified) {
      console.log("User account is not verified.");
      return res.status(401).json({
        error:
          "Account not verified. Please check your email for the OTP and verify your account.",
      });
    }

    // 4. If verified, generate and send the token
    console.log("Login successful! Generating token.");
    const payload = { id: user.id };
    const token = generateToken(payload);
    res.json({ token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// @desc   get all
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc   get profile via token
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    res.json({ user });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc   update password
exports.updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(userId);
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    user.password = newPassword;
    await user.save();
    res.json({ message: "Password updated" });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc   get user by userName
exports.getUserByUserName = async (req, res) => {
  try {
    const uName = req.params.userName;
    const user = await User.findOne({ userName: uName });
    if (!user) return res.status(404).json({ error: "User not found" });
    const data = {
      name: user.name,
      email: user.email,
      isVoted: user.isVoted,
      address: user.address,
    };
    res.json({ user: data });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//@desc verify token by nodemailer
exports.verifyByEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ verificationToken: token });

    if (!user) return res.status(400).send("Invalid token");

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.send("Account verified successfully!");
  } catch (error) {
    res.status(500).send("Error verifying account");
  }
};
