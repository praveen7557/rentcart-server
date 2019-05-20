const { Category, City } = require('../models');

const Mutation = {
  async createCategory(_, { name, parent }) {
    let category = await Category.create({
      name,
      parent
    });
    return category;
  },
  async createCity(_, { name, lat, long }) {
    let city = await City.create({
      name,
      lat,
      long
    });
    return city;
  }
}

module.exports = Mutation;