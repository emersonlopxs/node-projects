console.log('Starting app.js');

// calling a node module
const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');

const res = notes.add(1, 5);

console.log(res);


// get info from the user logged in
// const user = os.userInfo();

// Option one
// fs.appendFile('grettings.txt', `hello ${user.username}! You are ${notes.age}`, (err) => {
//   if (err) {
//     console.error(err);
//   }
// });

// Option two
// fs.appendFileSync('gretting.txt', 'hello world');
