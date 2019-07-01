const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');

const products = require('./routes/api/products');
const path = require('path');

const app = express();

// Body parser Middleware
app.use('/uploads', express.static('uploads'));



app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, 'uploads/')
  }
});

const upload = multer({ storage: storage });

/** Connect to Mongo DB */
mongoose.connect(db)
  .then(() => console.log('Mongo DB connected!'))
  .catch(err => console.log(err));

app.use('/api/products', products);

/** Serve static assets if in production */

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));  