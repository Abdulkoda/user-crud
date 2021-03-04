const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');
const routes = require('./routes');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

if (config.env !== 'production') {
    console.log('11111111111');
  }
app.get('/', (req, res) => {
  res.json({ message: 'หน้าเเรกครับ !' })
})  

// v1 api routes
app.use('/v1', routes);


app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  });
// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;


