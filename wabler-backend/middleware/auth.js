require('dotenv').load();

const jwt = require('jsonwebtoken');

// make sure the user is logged - AUTHENTICATION
exports.loginRequired = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded) {
        return next();
      } else {
        return next({
          status: 401,
          message: 'please login first'
        });
      }
    });
  } catch (error) {
    return next({
      status: 401,
      message: 'please login first'
    });
  }
};

// make sure we get the correct user - AUTHORIATION
exports.ensureCorrectUser = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded && decoded.id === req.params.id) {
        return next();
      } else {
        return next({
          status: 401,
          message: 'Unauthorized'
        });
      }
    });
  } catch (error) {
    return next({
      status: 401,
      message: 'Unauthorized'
    });
  }
};
