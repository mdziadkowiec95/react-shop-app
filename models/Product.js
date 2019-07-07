const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** Create Schema */

// const arraySchema = new Schema();

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  oldPrice: {
    type: Number,
  },
  category: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true
  },
  mainImage: {
    type: String,
    required: true,
  },
  allImages: {
    type: Array,
    required: true
  },
  description: [{
    value: {
      type: String,
      required: true
    },
  }],
  bestFeatures: [{
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
  }],
  specifications: [{
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
  }],
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = Product = mongoose.model('product', ProductSchema);