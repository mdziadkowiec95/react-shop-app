const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const products = require('./routes/api/products');

const app = express();

// Body parser Middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

/** Connect to Mongo DB */
mongoose.connect(db)
  .then(() => console.log('Mongo DB connected!'))
  .catch(err => console.log(err));

app.use('/api/products', products);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`)); 