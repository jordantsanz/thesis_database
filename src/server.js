/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import http from 'http';
import apiRouter from './router';

const { Storage } = require('@google-cloud/storage');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// DB Setup
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/thesis';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// set mongoose promises to es6 default
mongoose.Promise = global.Promise;

// initialize
const app = express();

// enable/disable cross origin resource sharing if necessary
app.use(cors());

// enable/disable http request logging
app.use(morgan('dev'));

// enable only if you want templating
app.set('view engine', 'ejs');

// enable only if you want static assets from folder static
app.use(express.static('static'));

// this just allows us to render ejs from the ../app/views directory
app.set('views', path.join(__dirname, '../src/views'));

// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'upload/');
  },
  filename(req, file, cb) {
    console.log('req: ', req.file);
    console.log('filename: ', file.originalname);
    cb(null, `${file.originalname}`); // Appending .jpg
  },
});

const upload = multer({ storage });

const gc = new Storage({
  projectId: 'jsanz-thesis-new-backend',
});

gc.getBuckets().then((x) => { return console.log(x); });
const drumBucket = gc.bucket('drum-notation-bucket');

// additional init stuff should go before hitting the routing

// default index route
app.get('/', (req, res) => {
  res.send('hello world!');
});

app.use('/api', apiRouter);

app.post('/video', upload.single('video'), async (req, res) => {
  if (req.file == null || req.file === {} || req.file === undefined) {
    res.sendStatus(500);
  }
  console.log('req file: ', req.file);
  console.log('video upload route called');

  const file = `./upload/${req.file.originalname}`;
  const splitIntoPieces = req.file.originalname.split('-');
  const userId = splitIntoPieces[0];
  const lessonId = splitIntoPieces[1];
  const splitFinal = splitIntoPieces[2].split('.');
  const attemptNum = splitFinal[0];
  console.log('THE VIDEO FILE: ', file);
  drumBucket.upload(file, {
    destination: `${userId}/${lessonId}/${attemptNum}.mp4`,
  });
  console.log('successfully uploaded');
  res.sendStatus(200);
});

// START THE SERVER
// =============================================================================
const port = process.env.PORT || 9090;

const server = http.createServer(app);

server.listen(port);

console.log(`listening on: ${port}`);
