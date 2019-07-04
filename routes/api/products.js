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
}).array('product_images', 3);

/**
 * @route GET api/products
 * @desc Get all products
 * @access Public
 */

router.get('/', (req, res) => {
  Product.find()
    .sort({ date: -1 })
    .then(fetchedProducts => {
      // console.log(products);
      res.json({
        status: 'success',
        fetchedProducts
      });
    });
});

/**
 * @route GET api/products/category
 * @desc Get all products by specific category
 * @access Public
 */

router.get('/category', (req, res) => {
  Product.find({ category: req.query.category })
    .sort({ date: -1 })
    .then(fetchedProducts => {
      res.json({
        status: 'success',
        fetchedProducts
      });
    })
    .catch(err => {
      console.log(err);
      res.json('Error while fetching products by category');
    })
});


/**
 * @route POST api/items
 * @desc Create new item
 * @access Public
 */

router.post('', (req, res) => {
  upload(req, res, function (err) {
    // Prepare error message to send as response
    const errorMessage = 'Something went wrong! Remember that you can upload max 3 images and only in .png or .jpg format';

    if (err instanceof multer.MulterError) {
      console.log(err);

      res.json({
        status: 'failed',
        message: errorMessage
      });
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log(err);

      res.json({
        status: 'failed',
        message: errorMessage
      });
    }

    // Everything went fine.

    console.log(req.body.specifications);
    console.log(req.body.bestFeatures);
    res.json(req.body.bestFeatures)

    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      oldPrice: req.body.oldPrice,
      category: req.body.category,
      images: req.files.map(file => file.path),
      description: req.body.description,
      bestFeatures: req.body.bestFeatures,
      specifications: req.body.specifications
    });

    console.log({
      name: req.body.name,
      price: req.body.price,
      oldPrice: req.body.oldPrice,
      category: req.body.category,
      images: req.files.map(file => file.path),
      description: req.body.description,
      bestFeatures: req.body.bestFeatures,
      specifications: req.body.specifications
    });


    // newProduct
    //   .save()
    //   .then(product => {
    //     res.status(201).json({
    //       message: 'Product created with success',
    //       createdProduct: {
    //         name: product.name,
    //         price: product.price,
    //         oldPrice: product.oldPrice,
    //         category: product.category,
    //         images: product.images,
    //         description: product.description,
    //         bestFeatures: product.bestFeatures,
    //         specifications: product.specifications
    //       }
    //     });
    //   })
    //   .catch(err => {
    //     res.json({
    //       message: 'Error while adding a new product',
    //       err
    //     });
    //   });

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
