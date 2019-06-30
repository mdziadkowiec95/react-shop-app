const dotenv = require('dotenv').config();

const password = process.env.MONGO_DB_PASSWORD;

module.exports = {
  mongoURI: `mongodb+srv://admin:${password}@react-shop-app-7p7rr.mongodb.net/test?retryWrites=true&w=majority`,
};