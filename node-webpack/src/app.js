import express from 'express'

const app = express();

app.get('/', (req, res) => {
  res.send('hello world!')
  console.log('request made!');
})

app.listen(3000)
