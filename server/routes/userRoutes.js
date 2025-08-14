const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");


// Get all the users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//POST Route, Create a new user
router.post("/signup", async (req, res) => {
  try {

    // Only one admin is allowed, check if an admin already exists
    if (req.body.role === 'admin') {
      const existingAdmin = await User.findOne({ role: 'admin' });
      if (existingAdmin) {
        return res.status(400).json({ error: "An admin already exists." });
      }
    }

    //Assuming the request body contains the User data
    const data = req.body;

    //Create a new User document using the Mongoose model
    const newUser = new User(data);

    //Save the new user to the database
    const response = await newUser.save();
    console.log("data saved");

    const payload = {
      id: response.id,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is: ", token);

    res.status(200).json({ response: response, token: token });
  } catch (error) {
    // Correctly handle the MongoServerError (code 11000)
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      return res.status(400).json({ error: `The ${duplicateField} you entered is already in use.` });
    }
    // For other errors, log and send a generic message
    console.error("Signup error:", error);
    res.status(500).json({ error: "An unexpected error occurred. Please try again." });
  }
});

// Login Route, get token
router.post("/login", async (req, res) => {
  try {
    //Extract email and password from request body
    const { email, password } = req.body;

    //Find the user by email
    const user = await User.findOne({ email: email });

    //If user does not exist or password does not match, return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    //generate Token
    const payload = {
      id: user.id,
    };
    const token = generateToken(payload);

    //return token as response
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

//Fetch Current User by Auth Token, Profile
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;
    const user = await User.findById(userId);
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Profile Password Update
router.put("/profile/password", jwtAuthMiddleware, async (req, res) => {
  try {
    //Extract the id from the token
    const userId = req.user.id;

    //Extract current and new passwords from request body
    const { currentPassword, newPassword } = req.body;

    //Find the user by userId
    const user = await User.findById(userId);

    //If password does not match, return error
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    //Update the user's password
    user.password = newPassword;
    await user.save();

    console.log("password updated");
    res.status(200).json({ message: "Password updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add this new route below your POST /signup route:
router.get("/:userName", async (req, res) => {
  try {
    // Extract the userName from the URL parameters
    const userName = req.params.userName;

    // Find the user by their userName
    const user = await User.findOne({ userName: userName });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return non-sensitive user data
    const userData = {
      name: user.name,
      email: user.email,
      isVoted: user.isVoted,
      address: user.address,
    };

    res.status(200).json({ user: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
