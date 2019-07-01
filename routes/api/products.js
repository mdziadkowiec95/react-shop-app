const express = require('express');

const router = express.Router();
const multer = require('multer');

// Product model

const Product = require('../../models/Product');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true); // store file
  } else {
    cb(new Error('The file has wrong format'), false); // reject file
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

/**
 * @route GET api/items
 * @desc Get all items
 * @access Public
 */

router.get('/', (req, res) => {
  Product.find()
    .sort({ date: -1 })
    .then(products => {
      res.json(products);
    });
});

/**
 * @route POST api/items
 * @desc Create new item
 * @access Public
 */

router.post('', upload.single('image'), (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    image: req.file.path
  });

  newProduct
    .save()
    .then(product => {
      res.status(201).json({
        message: 'Product created with success',
        createdProduct: {
          name: product.name,
          price: product.price,
          category: product.category,
          image: product.image
        }
      });
    })
    .catch(err => {
      res.status(404).json({
        message: 'Error while adding a new product',
        err
      });
    });
});

/**
 * @route DELETE api/items
 * @desc Delete an item
 * @access Public
 */

router.delete('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => product.remove().then(() => res.json({ success: true })))
    .catch(() => res.status(404).json({ success: false }));
});

module.exports = router;
