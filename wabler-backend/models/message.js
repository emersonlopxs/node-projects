const mongoose = require('mongoose');
const User = require('./user');

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      maxlength: 140
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      // maching the user model
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

// remove the deleted messege id from the user message array
messageSchema.pre('save', async function(next) {
  try {
    const user = await User.findById(this.user);
    user.messages.remove(this.id);
    await user.save();
    return next();
  } catch (error) {
    return next(error);
  }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
