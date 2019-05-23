const server = require('./server');

server.listen({ port: 3000 })
  .then(({ url, server }) => {
    console.log(`Server is running on ${url}`)
  })

