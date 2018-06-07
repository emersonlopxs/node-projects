const express = require('express');

const router = express.Router();
const { signup, signin } = require('../handlers/auth');

// when you get a post on this route run that function
router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;
