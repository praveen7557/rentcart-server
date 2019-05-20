const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = mongoose.model('Category', {
  name: {
    type: String,
    required: true
  },
  parent: {
    type: Schema.ObjectId,
    ref: 'Category',
    default: null
  }
})

module.exports = Category;