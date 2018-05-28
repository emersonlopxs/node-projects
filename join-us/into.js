const express = require('express');
const faker = require('faker');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'join_us',
  password: 'password'
});

// SELECTING THE DATA
// const sql = 'SELECT COUNT(*) AS total FROM users';
// connection.query(sql, (error, results, fields) => {
//   if (error) throw error;
//   console.log(results);
// });

// INSERT DATA
// const sql = 'INSERT INTO users (email) VALUES("reallybad@yahoo.com")';

// connection.query(sql, (error, results, fields) => {
//   if (error) throw error;
//   console.log(results);
// });

// INSERT DATA TAKE 2
// const person = {
//   email: faker.internet.email(),
//   // the package mysql converts the date to mysql syntax
//   created_at: faker.date.past()
// };

// connection.query('INSERT INTO users SET ?', person, (error, result) => {
//   if (error) throw error;
//   console.log(result);
// });


// INSERT DATA 3 ARRAYS
let data = [];
for (let i = 0; i < 532; i++) {
  data.push([faker.internet.email(), faker.date.past()]);
}
console.log(data);

const sql = 'INSERT INTO users (email, created_at) VALUES ?';

connection.query(sql, [data], (error, result) => {
  console.log(error);
  console.log(result);
});


connection.end();

// app.listen(3000, () => {
//   console.log('server is running on port 3000');
// });
