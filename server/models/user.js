const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { lowerCase } = require("lodash");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    lowercase: true,
    set: (v) => v.replace(/\s+/g, ""),
  },
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, lowercase: true, minlength: 3 },
  address: { type: String, required: true, minlength: 3 },
  aadharCardNumber: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  password: { type: String, required: true, minlength: 3 },
  role: { type: String, enum: ["voter", "admin"], default: "voter" },
  isVoted: { type: Boolean, default: false },
  verificationToken: { type: String },
  otp: {
    type: String,
    required: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

// 🔐 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

// ✅ Add the comparePassword method
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export the User model
const User = mongoose.model("User", userSchema);
module.exports = User;
