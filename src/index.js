const app = require('./app')
const logger = require('./config/logger');
const config = require('./config/config');
const {sequelize} = require('./models/mysqldb');
const fs = require("fs");
const https = require("https")

// create server
let server

sequelize.authenticate().then(() => {
    logger.info('Connected to MysqlDB');
    if(config.env !== 'development'){
      server = https.createServer({
        key: fs.readFileSync(config.key),
        cert:  fs.readFileSync(config.cert),
        ca:  fs.readFileSync(config.ca),
      }, app).listen(config.port, () => {
        console.log("Listening to port ", config.port);
      });
    } else {
      server = app.listen(config.port, () => {
        console.log("Listening to port ", config.port);
      });
    }
  }).catch(() => {
    logger.error('Failed to MysqlDB');
  })
  
  const exitHandler = () => {
    if (server) {
      server.close(() => {
        logger.info('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };
  
  const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
  };
  
  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);
  
  process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
      server.close();
    }
  });

