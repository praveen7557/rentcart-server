const server = require('../../server');
const mongoose = require('mongoose');


module.exports = async () => {
  await server.listen({ port: process.env.PORT });
  global.httpServer = server;
  mongoose.connection.dropDatabase();
  // global.httpServer = await server.start(options, ({ port }) => console.log(`Server is running at: ${port}`));
}