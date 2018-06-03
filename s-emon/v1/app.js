const express = require('express'),
  mysql = require('mysql'),
  faker = require('faker'),
  bodyParser = require('body-parser'),
  app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 's_emon'
});


app.get('/', (req, res) => {
  // res.json('hello world!');
  const sql = 'SELECT * FROM users ORDER BY created_at DESC ';
  connection.query(sql, (error, results, fields) => {
    if (error) console.log('ops');
    // console.log(results);
    res.json(results);
    console.log('users requested!');
  });
});


app.post('/register', (req, res) => {
  // gets the data from the client
  const user = {
    full_name: req.body.full_name,
    password: req.body.password,
    email: req.body.email,
    username: req.body.username,
    img: req.body.img
  };
  console.log(user);
  const sql = 'INSERT INTO users SET ?'; //Inserts user to DB
  connection.query(sql, user, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results);
  });
  res.json(req.body);
  console.log('POST requested!');
});

app.listen(3000, () => console.log('go to port 3000'));
