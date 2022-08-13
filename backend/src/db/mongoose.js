const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.MONGODB_URL;

mongoose.connect(
  URL,
  () => {
    console.log('DB Conntected.');
  },
  (err) => {
    console.log(err.message);
  },
  {
    useNewUrlParser: true,
  }
);
