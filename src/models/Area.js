const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Area = mongoose.model('Area', {
  name: {
    type: String,
    required: true,
    unique: true
  },
  city: {
    type: Schema.ObjectId,
    ref: 'City',
    required: true
  }
})

module.exports = Area;