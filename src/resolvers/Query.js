const { Category, City, Item } = require('../models');

const Query = {
  async category(_, { id }) {
    let category = await Category.findById(id).populate('parent');
    return category;
  },
  async city(_, { id }) {
    let city = await City.findById(id);
    return city;
  },
  async item(_, { id }) {
    let item = await Item.findById(id).populate('city area category').exec();
    return item;
  }
}

module.exports = Query;