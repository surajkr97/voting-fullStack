const User = require("../models/user");
const { generateToken } = require("../jwt");

// @desc   signup
exports.signup = async (req, res) => {
  try {
    if (req.body.role === "admin") {
      const existingAdmin = await User.findOne({ role: "admin" });
      if (existingAdmin) {
        return res.status(400).json({ error: "An admin already exists." });
      }
    }

    const newUser = new User(req.body);
    const response = await newUser.save();

    const payload = { id: response.id };
    const token = generateToken(payload);

    res.status(200).json({ response, token });
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

// @desc   login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const payload = { id: user.id };
    const token = generateToken(payload);
    res.json({ token });
  } catch (err) {
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
