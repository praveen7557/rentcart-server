const mongoose = require('mongoose');
const server = require('../server');
const { City, Area, Item, Category } = require('../src/models');

const { createTestClient } = require('apollo-server-testing');

const addItem = `
mutation CreateItem ($name: String!,$description: String!, $images:[String], $category: String, $currentPrice: Int, $price: Int, $address: String, $location: GraphQLJSONObject, $caution: Int, $area: String, $city: String){
  createItem(name: $name, description: $description, images:$images, category: $category, currentPrice: $currentPrice, price: $price, address: $address, location: $location, caution: $caution, area: $area, city: $city){
    id,
    name
  }
}
`

const getItem = `
query GetItem($id:String!){
  item(id: $id){
    name,
    id,
    city{
      name
    },
    category{
      name
    },
    area{
      name
    },
    location{
      lat
    }
  }
}
`

let cityId, areaId, categoryId;

beforeAll(async () => {
  // await server.listen({ port: process.env.PORT });
  // mongoose.connection.dropDatabase();
  let city = await City.create({
    name: "US",
    lat: 10.1123,
    long: 12.112
  });
  cityId = city.id;
  let area = await Area.create({
    name: "LA",
    city: cityId
  });
  areaId = area.id;
  let res = await Category.create({
    name: "Sports"
  })
  categoryId = res.id;
})

jest.setTimeout(1000000);
test('add item', async () => {
  const { query, mutate } = createTestClient(server);

  let res = await mutate({
    query: addItem,
    variables: {
      "name": "Yonex Carbonex 6000 Racquet",
      "description": "Yonex Carbonex 6000 Racquet",
      "images": ["https://images-na.ssl-images-amazon.com/images/I/51NxKo%2Bx4QL._SL1000_.jpg", "https://n3.sdlcdn.com/imgs/a/i/e/YONEX-CARBONEX-6000-Badminton-Racket-1126541-1-72ae8.jpg"],
      "price": 50,
      "city": cityId,
      "caution": 500,
      "area": areaId,
      "currentPrice": 1149,
      "address": "HMT Hills",
      "category": categoryId
    }
  });
  let resData = res.data.createItem;
  expect(resData.name).toBe("Yonex Carbonex 6000 Racquet");

  let item = await query({
    query: getItem,
    variables: {
      id: resData.id
    }
  });
  resData = item.data.item;
  expect(resData.name).toBe("Yonex Carbonex 6000 Racquet");
  expect(resData.city.name).toBe("US");
  expect(resData.area.name).toBe("LA");
  expect(resData.category.name).toBe("Sports");
});