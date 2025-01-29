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
      } else if(req.cookies.jwt){
        token = req.cookies.jwt;
      }
      
    if(!token){
        return res.status(401).json({success:false, message: 'You are not logged in!' });

    }
  
      //   Verify token
      const decoded =await jwt.verify(token, process.env.SECRET);
      const freshUser = await User.findById(decoded.user.id);
      if (!freshUser)
        return res
          .status(401)
          .json({ success:false, message: 'User not Found' });
  
      // res.json({
      //   token,
      //   status: 'nothing'
      // });
      req.user = freshUser;
    //   res.locals.user=freshUser;
      next();
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  };