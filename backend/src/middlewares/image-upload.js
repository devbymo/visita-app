const multer = require('multer');
const HttpError = require('../models/http-error');
const uuid = require('uuid');

const imageUpload = multer({
  limits: {
    fileSize: 1500000, // 1.5mb
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images');
    },
    fileName: (req, file, cb) => {
      const extention = file.mimetype.split('/')[1];
      const path = `${uuid()}.${extention}`;
      cb(null, path);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      return cb(next(new HttpError('Please upload an image', 422)));
    }

    cb(null, true);
  },
});

module.exports = imageUpload;
