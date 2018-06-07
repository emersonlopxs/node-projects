require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');
const db = require('./models');
const { loginRequired, ensureCorrectUser } = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

// Using auth
app.use(
  '/api/users/:id/messages',
  loginRequired,
  ensureCorrectUser,
  messagesRoutes
);

app.get('/api/messages', async (req, res, next) => {
  try {
    const messages = await db.Message.find()
      .sort({ createdAt: 'desc' })
      .populate('user', {
        username: true
      });
    return res.status(200).json(messages);
  } catch (error) {
    return next(error);
  }
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// get any error and sent it as a json message
app.use(errorHandler);

app.listen(3000, () => {
  console.log('app is running on port 3000');
});
