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



// app.use(multer({
//   dest: './uploads/',
//   rename: function (fieldname, filename) {
//     return filename;
//   },
// }));

/** Connect to Mongo DB */
mongoose.connect(db)
  .then(() => console.log('Mongo DB connected!'))
  .catch(err => console.log(err));

app.use('/api/products', products);



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`)); 