const http = require("http");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("./src/utils/bodyParser");

const PORT = process.env.PORT || 5000;

let database = {};

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  const [path, id] = url.split("/").slice(1);
  console.log(`path: ${path}`, `id: ${id}`);

  // TODO: ask Leha if there are regExp
  if (path !== "person") {
    console.log(`received ${method}-request on ${url}`);
    res.write("Sorry but we dont have other routes than person \n");
    res.end();
  }

  switch (method) {
    case "POST":
      console.log(`received ${method}-request on ${url}`);
      await bodyParser(req);
      database[`${uuidv4()}`] = req.body;
      console.log("db: ", database);
      res.write("Hello POST hardcoded \n");
      res.end();
      break;

    case "GET":
      console.log(`received ${method}-request on ${url}`);
      res.write("Hello GET hardcoded\n");
      res.end();
      break;

    default:
      break;
  }
});

server.listen(PORT, "localhost", () => {
  console.log(`Server is running on port ${PORT}`);
});
