const { Category, City, Item, Area } = require('../models');

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
  },
  async cities() {
    let cities = await City.find();
    return cities;
  },
  async categories() {
    let categories = await Category.find({
      parent: null
    });
    return categories;
  },
  async subCategories(_, { id }) {
    let categories = await Category.find({
      parent: id
    });
    return categories;
  },
  async areas(_, { id }) {
    let areas = await Area.find({
      city: id
    });
    return areas;
  },
  async items() {
    let items = await Item.find().populate('city area').exec();
    return items;
  }
}

module.exports = Query;