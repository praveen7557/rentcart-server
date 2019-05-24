const mongoose = require('mongoose');
const server = require('../server');
const { Category } = require('../src/models');

const { createTestClient } = require('apollo-server-testing');

const addCategory = `
mutation AddCategory($name: String!, $parent: String){
  createCategory(name:$name, parent: $parent){
    name,
    id,
    parent{
      name
    }
  }
}
`

const getCategory = `
query GetCategory($id: String!){
  category(id: $id){
    id,
    name,
    parent{
      name,
      id
    }
  }
}

`

let categoryId;

beforeAll(async () => {
  let res = await Category.create({
    name: "Sports"
  })
  categoryId = res.id;
})

jest.setTimeout(1000000);
test('add category', async () => {
  const { query, mutate } = createTestClient(server);

  let res = await mutate({
    query: addCategory,
    variables: {
      name: "Chicks"
    }
  });
  let resData = res.data.createCategory;
  expect(resData.name).toBe("Chicks");
});

test('add category with parent', async () => {
  const { query, mutate } = createTestClient(server);
  let res = await mutate({
    query: addCategory,
    variables: {
      name: "Badminton",
      parent: categoryId
    }
  });
  let resData = res.data.createCategory;
  expect(resData.parent.name).toBe("Sports");
});

test('get category by id', async () => {
  const { query, mutate } = createTestClient(server);
  let catData = await query({
    query: getCategory,
    variables: {
      id: categoryId
    }
  });
  expect(catData.data.category.name).toBe("Sports");
})


