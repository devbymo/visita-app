// Adding the need 3rd-party libraries
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const config = require("./config/database");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
const multer = require("multer");
const fs = require("fs");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const multer = require("multer");
const multerGridfs = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
