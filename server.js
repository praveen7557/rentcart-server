const { ApolloServer } = require('apollo-server')

const schema = require('./src/schema')

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"))
db.once("open", function () {
  console.log("Connection Succeeded")
})

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    ...req
  }),
  playground: process.env.NODE_ENV === 'development',
  debug: process.env.NODE_ENV === 'development'
})

module.exports = server;