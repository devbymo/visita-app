const isInputDataValid = require('../utils/isInputsValid');
const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {};
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
      return next(new HttpError(`Email is already in use!`, 400));
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
  });
  // Save the user.
  try {
    await newUser.save();
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
  res.status(201).json({
    message: 'User created!',
    user: newUser.toObject({ getters: true }),
  });
};
const login = async (req, res, next) => {};

module.exports = {
  getUsers,
  signup,
  login,
};
