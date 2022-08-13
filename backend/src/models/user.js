const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const HttpError = require('./http-error');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email is already in use'],
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: 6,
  },
  image: {
    type: String,
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  places: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Place',
    },
  ],
});

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this;

  // Hash passwrod only if the password modifyed.
  if (user.isModified('password')) {
    try {
      user.password = await bcrypt.hash(user.password, 8);
    } catch (error) {
      return next(new HttpError('Something went wrong, try again later!', 500));
    }
  }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
