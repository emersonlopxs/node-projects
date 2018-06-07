const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../config/dbConfig');
const comparePassword = require('../middleware/comparePassword');
const errorHandler = require('../handlers/error');
const { loginRequired, ensureCorrectUser } = require('../middleware/auth');

const router = express.Router();

// prefix '/api' GET ALL THE USERS
router.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users ORDER BY created_at DESC';
  db.query(sql, (error, results, fields) => {
    if (error) {
      // sending the error to the errorHandler function
      return errorHandler(error, req, res);
    }
    return res.json({ results });
  });
});

// SIGN UP ROUTE
router.post('/signup', async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      username: req.body.username,
      password: hashedPassword
    };

    const { username, password } = user;
    const token = jwt.sign({ username, password }, 'secret');

    const sql = 'INSERT INTO users SET ?'; //Inserts user to DB
    db.query(sql, user, (error, results) => {
      // check if there were any errors
      if (error) {
        return errorHandler(error, req, res);
      }
      // all went well
      // return the token and the username
      return res.json({
        username,
        token
      });
    });
  } catch (error) {
    return next(error);
  }
});

// SIGN IN ROUTE
router.post('/signin', (req, res) => {
  const sql = 'SELECT * FROM users WHERE username = ?';
  const { username, password } = req.body;

  db.query(sql, [username], async (error, results) => {
    try {
      if (error) {
        return errorHandler(error, req, res);
      }
      // if the password isn't correct
      const isMatch = await comparePassword(password, results[0].password);
      if (!isMatch) {
        return res.json({
          message: 'Oops, wrong password or username'
        });
      }
      if (!results.length <= 0) {
        // all went well
        const { username } = results[0];
        const hashedPassword = results[0].password;
        const token = jwt.sign({ username, hashedPassword }, 'secret');
        res.status(200).json({
          username,
          token
        });
      } else {
        return res.json('username doesnt exist');
      }
    } catch (error) {
      const err = new Error('username doesnt exist');
      err.status = 404;
      return errorHandler(err, req, res);
    }
  });
});


router.get('/:id/profile', loginRequired, ensureCorrectUser, (req, res) => {
  const sql = 'SELECT * FROM users WHERE username = ?';
  const username = req.params.id;

  db.query(sql, [username], async (error, results) => {
    if (error) {
      return errorHandler(error, req, res);
    }
    res.status(200).json({ results });
  });
});

module.exports = router;
