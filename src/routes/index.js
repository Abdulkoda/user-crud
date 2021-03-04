const express = require('express');
const userRoute = require('./user.route');
const config = require('../config/config');

const router = express.Router();

const defaultRoutes = [
    // routes available only in development mode
  {
    path: '/user',
    route: userRoute,
  },
];

const devRoutes = [];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;