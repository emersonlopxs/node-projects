const mongoose = require('mongoose');

mongoose.set('debug', true);
// promisses not callbacks
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/wabler', {
  keepAlive: true
});

module.exports.User = require('./user');
module.exports.Message = require('./message');
