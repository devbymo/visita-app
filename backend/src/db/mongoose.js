const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.MONGODB_URL;

// Connect to our local database.
mongoose.connect(
  URL,
  () => {
    console.log('Conntected.');
  },
  (err) => {
    console.log(err.message);
  },
  {
    useNewUrlParser: true,
  }
);
