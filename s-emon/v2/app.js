const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 's_emon_v2'
});

// GET ALL THE USERS
app.get('/api/users', loginRequired, (req, res) => {
  const sql = 'SELECT * FROM users ORDER BY created_at DESC';
  connection.query(sql, (error, results, fields) => {
    if (error) {
      // sending the error to the errorHandler function
      return errorHandler(error, req, res);
    }
    console.log('Users requested');
    return res.json({ results });
  });
});

// SIGN UP ROUTE
app.post('/api/signup', async (req, res, next) => {
  try {
    console.log('sign up requested!');
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
      username: req.body.username,
      password: hashedPassword
    };

    const { username, password } = user;
    const token = jwt.sign({ username, password }, 'secret');

    const sql = 'INSERT INTO users SET ?'; //Inserts user to DB
    connection.query(sql, user, (error, results) => {
      // check if there were any errors
      if (error) {
        return errorHandler(error, req, res);
      }
      // this happens case not errors are found
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
app.post('/api/signin', (req, res) => {
  const sql = 'SELECT * FROM users WHERE username = ?';
  const { username, password } = req.body;

  connection.query(sql, [username], async (error, results) => {
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
    // all went well
    const { username } = results[0];
    const hashedPassword = results[0].password;
    const token = jwt.sign({ username, hashedPassword }, 'secret');
    res.status(200).json({
      username,
      token
    });
  });
});

// AUTHENTICATION
function loginRequired(req, res, next) {
  try {
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
}

app.get('/:id/profile', loginRequired, ensureCorrectUser, (req, res) => {
  const sql = 'SELECT * FROM users WHERE username = ?';
  const username = req.params.id;

  connection.query(sql, [username], async (error, results) => {
    if (error) {
      return errorHandler(error, req, res);
    }

    res.status(200).json({ results });
  });
});

// AUTHORIZATION
function ensureCorrectUser(req, res, next) {
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
}

// COMPARE PASSWORDS
async function comparePassword(pass1, pass2, next) {
  try {
    const isMatch = await bcrypt.compare(pass1, pass2);
    return isMatch;
  } catch (error) {
    return errorHandler(error);
  }
}

// ERROR HANDLING
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
function errorHandler(error, req, res, next) {
  return res.status(error.status || 500).json({
    error: {
      message: error.message || 'Oops! Something went wrong'
    }
  });
}
// get any error and sent it as a json message
app.use(errorHandler);

app.listen(5000, () => {
  console.log('Server is up on port 5000');
});
