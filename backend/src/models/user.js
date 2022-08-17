const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const HttpError = require('./http-error');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minLength: [3, 'Name must be at least 3 characters long'],
      maxLength: [25, 'Name must be less than 30 characters long'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email is already in use'],
      trim: true,
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
      default:
        'https://images.unsplash.com/photo-1548189797-82c6a7cb85d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM5fHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      minLength: [4, 'Address must be at least 10 characters long'],
      maxLength: [30, 'Address must be less than 50 characters long'],
      trim: true,
    },
    places: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Place',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// =====================
// MODEL METHODS
// =====================
// Find user by email & password provided.
userSchema.statics.findByCredentials = async (email, password) => {
  // Find user by email.
  const user = await User.findOne({ email });

  // Check if the user exists or not.
  if (!user) {
    throw new Error('Unable to login');
  }

  // Check password.
  const userPassword = user.password;
  const isPasswordMatch = await bcrypt.compare(password, userPassword);
  if (!isPasswordMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

// =====================
// INSTANCES METHODS
// =====================

// =====================
// MODEL MIDDLEWARES
// =====================
// Hash the plain text password.
userSchema.pre('save', async function (next) {
  const user = this;

  // Hash passwrod only if the password modifyed.
  if (user.isModified('password')) {
    try {
      const numOfRounds = 8;
      user.password = await bcrypt.hash(user.password, numOfRounds);
    } catch (error) {
      return next(new HttpError('Something went wrong, try again later!', 500));
    }
  }

  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
