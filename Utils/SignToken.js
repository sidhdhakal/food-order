const jwt = require('jsonwebtoken');

exports.signToken = id => {
    return jwt.sign({ id: id, }, process.env.SECRET, {
      expiresIn: '7d'
    });
  };