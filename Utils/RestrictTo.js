exports.restrictTo = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res
          .status(401)
          .json({ success: false, message: 'You dont have permission' });
      }
      next();
    };
  };