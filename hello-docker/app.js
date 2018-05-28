const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hello from docker!');
});

app.listen(5000, () => {
  console.log('Server is up on port 3000');
});
