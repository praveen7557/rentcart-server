require('babel-polyfill')
const Query = require('./Query');
const Mutation = require('./Mutation');
const { GraphQLJSONObject } = require('graphql-type-json');

const resolvers = {
  Query,
  Mutation,
  GraphQLJSONObject
}

module.exports = resolvers;