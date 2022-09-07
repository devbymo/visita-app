const isInputDataValid = require('../utils/isInputsValid');
require('dotenv').config();
const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;

  // Check if the user is admin.
  // if (req.body.accessKey !== process.env.ADMIN_PASSWORD) {
  //   return next(
  //     new HttpError('You are not authorized to perform this action.', 401)
  //   );
  // }

  // Get all users & limit the returned data.
  try {
    users = await User.find({}, '-password -tokens -__v -createdAt -updatedAt');
  } catch (error) {
    return next(
      new HttpError('Unable to retrive users, please try again!', 500)
    );
  }

  res.status(200).json({
    users: users.map((user) => user.toObject({ getters: true })),
  });
};
const signup = async (req, res, next) => {
  const { name, email, password, address } = req.body;

  // Check if there is invalid fields passed.
  const passedInputsFields = Object.keys(req.body);
  const allowedInputsFields = ['name', 'email', 'password', 'address', 'image'];
  const isFieldsValid = isInputDataValid(
    passedInputsFields,
    allowedInputsFields
  );
  if (!isFieldsValid) {
    return next(
      new HttpError(
        `Not allowed field passed, allowed fields: [${allowedInputsFields}]!`,
        400
      )
    );
  }

  // Check the required inputs.
  if (!name || !email || !password || !address) {
    return next(
      new HttpError(
        `Missing inputs! required inputs [name, email, password, address].`,
        400
      )
    );
  }

  // Check if the email is already in use.
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new HttpError(`Email is already in use!`, 422));
    }
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  // Create the user.
  const newUser = new User({
    name,
    email,
    password,
    address,
    image: req.file ? `${req.file.destination}/${req.file.filename}` : '',
  });

  // Save the user.
  try {
    await newUser.save();
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  // Generate auth tokens.
  let token;
  try {
    token = await newUser.generateAuthToken();
  } catch (err) {
    return next(new HttpError('Unable to signup!', 500));
  }

  res.status(201).json({
    message: 'User created!',
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      address: newUser.address,
      image: newUser.image,
    },
    token,
  });
};
const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate passed fields.
  const passedFields = Object.keys(req.body);
  const allowedFields = ['email', 'password'];
  const isFieldsValid = isInputDataValid(passedFields, allowedFields);
  if (!isFieldsValid) {
    return next(
      new HttpError(
        `Not allowed field passed, allowed fields: [${allowedFields}]!`,
        400
      )
    );
  }

  // Validate required inputs.
  if (!email || !password) {
    return next(
      new HttpError(`Missing inputs! required inputs [email, password].`, 400)
    );
  }

  // Search using email & password.
  let user;
  try {
    user = await User.findByCredentials(email, password);
  } catch (error) {
    return next(new HttpError('Unable to login!', 401));
  }

  // Check if user exists or not.
  if (!user) {
    return next(new HttpError('Unable to login!', 401));
  }

  // Generate auth tokens.let token;
  try {
    token = await user.generateAuthToken();
  } catch (err) {
    return next(new HttpError('Unable to login!', 500));
  }

  res.status(200).json({
    message: 'Logged in successfully.',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      image: user.image,
    },
    token,
  });
};

const logout = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
  } catch (error) {
    return next(new HttpError('Unable to logout!', 500));
  }

  res.status(200).json({ message: 'Logged out successfully.' });
};

module.exports = {
  getUsers,
  signup,
  login,
  logout,
};
