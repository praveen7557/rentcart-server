const { makeExecutableSchema } = require('apollo-server')
const { applyMiddleware } = require('graphql-middleware')
const { importSchema } = require('graphql-import')

const typeDefs = importSchema('src/schema/index.graphql')
const resolvers = require('./resolvers')

const schema = makeExecutableSchema({ typeDefs, resolvers })
const schemaWithMiddleware = applyMiddleware(schema)

module.exports = schemaWithMiddleware;