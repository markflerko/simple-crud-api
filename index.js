const http = require("http");

const PORT = process.env.PORT || 5000;

const db = {};

const server = http.createServer((req, res) => {
  const { method, url } = req;

  switch (url) {
    case "/person":
      console.log(`received ${method}-request on ${url}`);
      res.write("Hello Person \n");
      res.end();
      break;

    default:
      console.log(`received ${method}-request on ${url}`);
      res.write("Hello Node \n");
      res.end();
      break;
  }
});

server.listen(PORT, "localhost", () => {
  console.log(`Server is running on port ${PORT}`);
});
