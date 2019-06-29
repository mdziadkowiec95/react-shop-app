const express = require('express');
const router = express.Router();
const multer = require('multer');
// const busboy = require('connect-busboy');
const fs = require('fs');

// Product model

const Product = require('../../models/Product');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true); // store file 
  } else {
    cb(new Error('The file has wrong format'), false); // reject file
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

/** 
  @route GET api/items
  @desc Get all items
  @access Public
*/

router.get('/', (req, res) => {
  Product.find()
    .sort({ date: -1 })
    .then(products => {
      res.json(products);
    });
});

/** 
  @route POST api/items
  @desc Create new item
  @access Public
*/


router.post('', upload.single('image'), (req, res) => {
  console.log(req.file);


  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    image: req.file.path
  });

  newProduct
    .save()
    .then(product => {
      console.log(product);
      res.status(201).json({
        message: "Product created with success",
        createdProduct: {
          name: product.name,
          price: product.price,
          category: product.category,
          image: product.image
        }
      })
    }).catch(err => {

      res.status(404).json({
        message: "Error while adding a new product",
        err
      })
    });

  // newProduct.img.data = fs.readFileSync(req.file.path)
  // newProduct.img.contentType = 'image/jpeg';
  // newProduct.save();
  // res.json({ message: 'New image added to the db!' });
});


// const newProduct = new Product({
//   name: req.body.name,
//   price: req.body.price,
//   category: req.body.category,
//   img: {
//     data: fs.readFileSync(req.files.productImage.path),
//     contentType: 'image/jpg',
//   }
// });

// newProduct.save().then(product => res.json(product));
// });


/** 
  @route DELETE api/items
  @desc Delete an item
  @access Public
*/

router.delete('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => product.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
})


module.exports = router;



// router.post('', busboy(), (req, res) => {
//   console.log(req.body);

//   var fstream;
//   req.pipe(req.busboy);
//   req.busboy.on('file', function (fieldname, file, filename) {
//     console.log("Uploading: " + filename);
//     // console.log(file);
//     fstream = fs.createWriteStream(__dirname + '/../../uploads/' + filename);
//     file.pipe(fstream);
//     fstream.on('close', function () {
//       // res.redirect('back');
//       console.log('Upload finished');
//     });
//   });
