const bcrypt = require('bcrypt');
const errorHandler = require('../handlers/error');

// COMPARE PASSWORDS
async function comparePassword(pass1, pass2, next) {
  try {
    const isMatch = await bcrypt.compare(pass1, pass2);
    return isMatch;
  } catch (error) {
    return errorHandler(error);
  }
}

module.exports = comparePassword;
