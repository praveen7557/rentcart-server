const mongoose = require('mongoose');
const server = require('../server');
const { City } = require('../src/models');

const { createTestClient } = require('apollo-server-testing');

const addArea = `
mutation CreateArea($name:String!, $city: String!){
  createArea(name: $name, city: $city){
    name,
    city{
      name,
      id
    }
  }
}
`

let cityId;

beforeAll(async () => {
  await server.listen({ port: process.env.PORT });
  mongoose.connection.dropDatabase();
  let res = await City.create({
    name: "Ladakh",
    lat: 10.1123,
    long: 12.112
  });
  cityId = res.id;
})

jest.setTimeout(30000);
test('add area', async () => {
  const { query, mutate } = createTestClient(server);

  let res = await mutate({
    query: addArea,
    variables: {
      name: "IceMountations",
      city: cityId
    }
  });
  let resData = res.data.createArea;
  expect(resData.name).toBe("IceMountations");
});


