const dotenv = require('dotenv');
const path = require('path');

const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
      NODE_ENV: Joi.string().valid('production', 'development').required(),
      APP_PORT: Joi.number().default(3000),
      MYSQL_HOST: Joi.string().default('localhost'),
      MYSQL_PORT: Joi.number().default(443),
      MYSQL_USER: Joi.string().default('root'),
      MYSQL_DATABASE: Joi.string().required(),
      MYSQL_PASSWORD: Joi.string().allow(null, ''),
      MYSQL_LIMIT_TIME: Joi.number().default(10),
      JWT_SECRET: Joi.string().required(),
      JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30),
      JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30),
      SERVER_KEY: Joi.string().required(),
      SERVER_CERT: Joi.string().required(),
      SERVER_CA: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.APP_PORT,
    key: envVars.SERVER_KEY,
    cert: envVars.SERVER_CERT,
    ca: envVars.SERVER_CA,
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: 10,
    },
    mysql: {
        host: envVars.MYSQL_HOST,
        port: envVars.MYSQL_PORT,
        user: envVars.MYSQL_USER,
        password: envVars.MYSQL_PASSWORD,
        database: envVars.MYSQL_DATABASE,
        limit: envVars.MYSQL_LIMIT_TIME,
    }
};
