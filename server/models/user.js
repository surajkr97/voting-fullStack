const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  aadharCardNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["voter", "admin"], default: "voter" },
  isVoted: { type: Boolean, default: false },
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
