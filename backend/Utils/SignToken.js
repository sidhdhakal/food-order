const jwt = require('jsonwebtoken');

exports.signToken = (data) => {
    return jwt.sign(data, process.env.SECRET, {
      expiresIn: '7d'
    });
  };