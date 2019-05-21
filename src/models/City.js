const mongoose = require('mongoose');

const City = mongoose.model('City', {
  name: {
    type: String,
    required: true,
    unique: true
  },
  lat: {
    type: Number,
    required: true
  },
  long: {
    type: Number,
    required: true
  }
})

module.exports = City;