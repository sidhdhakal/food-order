const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
  },
  isVerified: {
    type: Boolean,
    required: false,
    default: false,
  },
  verifyToken: {
    type: String,
    required: false,
  },
  verifyTokenExpiry: {
    type: Date,
    required: false,
  },
  forgotPasswordToken: {
    type: String,
    required: false,
  },
  forgotPasswordExpiry: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
