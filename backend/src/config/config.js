// Import the dotenv package to read .env variables
require('dotenv').config();

// Export the configuration as a module
module.exports = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
  // baseURL: process.env.BASE_URL
};
