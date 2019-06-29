const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** Create Schema */

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = Product = mongoose.model('product', ProductSchema);