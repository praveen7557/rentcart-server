const { Category, City, Area, Item } = require('../models');

const Mutation = {
  async createCategory(_, { name, parent }) {
    let category = await Category.create({
      name,
      parent
    });
    return category.populate('parent').execPopulate();
  },
  async createCity(_, { name, lat, long }) {
    let city = await City.create({
      name,
      lat,
      long
    });
    return city;
  },
  async createArea(_, { name, city }) {
    let area = await Area.create({
      name,
      city
    });
    return await area.populate('city').execPopulate()
  },
  async createItem(_, { name, description, images, category, currentPrice, price, address, location, caution, area, city }) {
    let item = await Item.create({
      name, description, images, category, currentPrice, price, address, location, caution, area, city
    });
    return item;
  }
}

module.exports = Mutation;