const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// require('dotenv').config();

const errorHandler = require('./handlers/error');
const routes = require('./routes/routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// logs all the requests - combined - dev
app.use(morgan('dev'));

// ALL THE ROUTES
app.use('/api', routes);

// ERROR HANDLING
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// get any error and sent it as a json message
app.use(errorHandler);

app.listen(5000, () => {
  console.log('Server is up on port 5000');
});
