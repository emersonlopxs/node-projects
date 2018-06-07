const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signup = async function(req, res, next) {
  try {
    // create a user
    const user = await db.User.create(req.body);
    const { id, username } = user;
    // create a token
    const token = jwt.sign(
      {
        id,
        username
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      token
    });
  } catch (error) {
    // see what kind of error
    // respond with a message to a certain error
    if (error.code === 11000) {
      error.message = 'username or email taken';
    }
    return next({
      status: 400,
      message: error.message
    });
  }
};

exports.signin = async function(req, res, next) {
  try {
    // finding an user
    const user = await db.User.findOne({
      username: req.body.username
    });
    const { id, username } = user;
    const isMath = await user.comparePassword(req.body.password);
    if (isMath) {
      let token = jwt.sign(
        {
          id,
          username
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        token
      });
    } else {
      return next({
        status: 400,
        message: 'invalid username/password'
      });
    }
  } catch (error) {
    return next({
      status: 400,
      message: 'invalid username/password'
    });
  }
  // checking if their password matches what was sent to the server

  // log them in
};
