const dotenv = require('dotenv').config();

const password = process.env.MONGO_DB_PASSWORD;
const user = process.env.MONGO_DB_USER;
const address = process.env.MONGO_DB_URI;

module.exports = {
  mongoURI: `mongodb+srv://${user}:${password}@${address}`
};
