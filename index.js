const http = require("http");

const requestListener = require("./src/requestListener");

const PORT = process.env.PORT || 5000;

const server = http.createServer(requestListener);

server.listen(PORT, "localhost", () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
