const express = require('express'),
  app = express(),
  // Img = require('./imgSchema'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  router = require('./routes');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

const PORT = 3001;
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
