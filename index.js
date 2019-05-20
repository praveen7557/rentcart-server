const { GraphQLServer } = require('graphql-yoga');
require('dotenv').config()

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"))
db.once("open", function () {
  console.log("Connection Succeeded")
})

const resolvers = require('./src/resolvers');
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => req
})

const options = {
  port: process.env.PORT || 3000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
  bodyParserOptions: { limit: "10mb", type: "application/json" },
}

server.start(options, ({ port }) => console.log(`Server is running at: ${port}`));