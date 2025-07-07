const User = require('../models/User');

const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token ) {
      return res.status(401).json({ success: false, message: 'You are not logged in!' });
    }


    if(token==undefined) return 

    const decoded = jwt.verify(token, process.env.SECRET);
    const freshUser = await User.findById(decoded.id);

    if (!freshUser)
      return res.status(401).json({ success: false, message: 'User not Found' });

    req.user = freshUser;
    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
