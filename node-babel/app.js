import express from 'express';
import { sum, minus } from './math';

const app = express();

app.get('/', (req, res) => {
  res.send('this is node with babel');
  console.log(sum(1, 1)); // 2
  console.log(minus(1, 1)); // 0
});

app.listen(3000);
