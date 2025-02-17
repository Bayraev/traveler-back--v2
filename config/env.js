require('dotenv').config();

module.exports = {
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
};
