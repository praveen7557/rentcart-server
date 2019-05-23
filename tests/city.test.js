const mongoose = require('mongoose');
const server = require('../server');
const { City } = require('../src/models');

const { createTestClient } = require('apollo-server-testing');

const addCity = `
mutation ($name:String!, $lat: Float!, $long:Float!){
  createCity(name: $name, lat: $lat, long: $long){
    name,
    lat,
    long,
    id
  }
}
`

const getCity = `
query GetCity($id:String!){
  city(id: $id){
    name,
    lat,
    long,
    id
  }
}
`

let id;

beforeAll(async () => {
  await server.listen({ port: process.env.PORT });
  mongoose.connection.dropDatabase();
  let res = await City.create({
    name: "Ladakh",
    lat: 10.1123,
    long: 12.112
  });
  id = res.id;
})

jest.setTimeout(30000);
test('add city', async () => {
  const { query, mutate } = createTestClient(server);

  let res = await mutate({
    query: addCity,
    variables: {
      name: "Cicily",
      lat: 12.9538477,
      long: 77.3507442
    }
  });
  let resData = res.data.createCity;
  expect(resData.name).toBe("Cicily");

  let cityData = await query({
    query: getCity,
    variables: {
      id: resData.id
    }
  });
  expect(cityData.data.city.name).toBe("Cicily");
});

test('get city by id', async () => {
  const { query, mutate } = createTestClient(server);
  let cityData = await query({
    query: getCity,
    variables: {
      id
    }
  });
  expect(cityData.data.city.name).toBe("Ladakh");
})


