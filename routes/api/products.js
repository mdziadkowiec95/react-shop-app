const express = require('express');
const router = express.Router();

// Item model

const Product = require('../../models/Product');

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

router.post('/', (req, res) => {
  const newProduct = new Product({
    name: req.body.name
  });

  newProduct.save().then(product => res.json(product));
});


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