const jwt = require('jsonwebtoken');

// AUTHORIZATION
exports.loginRequired = function (req, res, next) {
  try {
    // return next();
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret', (err, decoded) => {
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

// AUTHENTICATION
exports.ensureCorrectUser = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'secret', (err, decoded) => {
      console.log(decoded.username);
      if (decoded && decoded.username === req.params.id) {
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

