const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/img2');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('we are connected!');
});

const imgSchema = new mongoose.Schema({
  title: String,
  link: String
});

const Img = mongoose.model('Img', imgSchema);

module.exports = Img;
