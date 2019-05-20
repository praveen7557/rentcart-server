const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = mongoose.model('Item', {
  name: {
    type: String,
    required: true
  },
  description: String,
  images: {
    type: Array,
    required: true
  },
  category: {
    type: Schema.ObjectId,
    ref: "Category"
  },
  currentPrice: Number,
  price: Number,
  address: String,
  location: String,
  caution: Number,
  city: {
    type: Schema.ObjectId,
    ref: "City"
  }
})

module.exports = Item;