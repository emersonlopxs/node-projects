const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'join_us',
  password: 'password'
});

app.get('/', (req, res) => {
  // find count of users
  const sql = 'SELECT COUNT(*) AS count FROM users';
  connection.query(sql, (error, response) => {
    // if (error) throw error;
    if (error) res.send('ops something went wrong');
    const { count } = response[0];
    res.render('home', { data: count });
  });
});

app.post('/register', (req, res) => {
  const person = {
    email: req.body.email
  };

  const sql = 'INSERT INTO users SET ?';
  connection.query(sql, person, (error, result) => {
    if (error) throw error;
    // console.log(result);
    res.redirect('/');
  });
});

app.get('/all', (req, res) => {
  const sql = 'SELECT * FROM users';
  connection.query(sql, (error, results) => {
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('server is running on port 3000');
});
