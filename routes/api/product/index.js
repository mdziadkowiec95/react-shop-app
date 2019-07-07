const express = require('express');
const router = express.Router();

const Product = require('../../../models/Product');


/**
 * @route GET api/product
 * @desc Get single product details
 * @access Public
 */

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  Product.findById(req.params.id)
    .then((fetchedProduct) => {
      if (!fetchedProduct) {
        res.send(404);
      } else {
        res.send({
          status: 'success',
          fetchedProduct
        })
      }
    })
    .catch((err) => res.send(404));
});

module.exports = router;