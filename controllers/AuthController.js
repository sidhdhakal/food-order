// import User from "../models/User";
const User = require("../models/User");
const bc = require("bcryptjs");
exports.signup = async (req, res) => {
  try {
    const oldUser = await User.findOne({ email: req.body.email });
    if (oldUser)
      return res.status(400).json({
        success: false,
        message: "User with email already exists",
      });

    let newUser = null;
    if (req.body.password) {
      const salt = await bc.genSalt(10);
      const pass = await bc.hash(req.body.password, salt);
      newUser = await User.create({ ...req.body, password: pass });
    } else newUser = await User.create(req.body);

    if (newUser) {
      return res.status(200).json({
        success: true,
        message: "Account created successfully",
        user: newUser,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const passcmp = await bc.compare(req.body.password, user.password);
      if(passcmp)
        return res.status(200).json({
          success: true,
          message: "Signed In successfully",
          user: user,
        });
    }
    res.status(400).json({
      success: false,
      message: "Invalid Credentials",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
