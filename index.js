const http = require("http");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("./src/utils/bodyParser");

const PORT = process.env.PORT || 5000;

let database = {};

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  const [path, person_id] = url.split("/").slice(1);
  console.log(`path: ${path}`, `id: ${person_id}`);

  // TODO: ask Leha if there are regExp
  if (path !== "person") {
    console.log(`received ${method}-request on ${url}`);
    res.write("Sorry but we dont have other routes than person \n");
    res.end();
  }

  switch (method) {
    case "PUT":
      await bodyParser(req);
      if (!database.hasOwnProperty(person_id)) {
        res.write(`Sorry but no user with ${person_id} exist \n`);
        res.end();
      } else {
        database[person_id] = { ...database[person_id], ...req.body };
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(database[person_id]));
        res.end();
      }
      break;

    case "POST":
      await bodyParser(req);
      const id = uuidv4();
      database[id] = { ...req.body, id };
      res.writeHead(201, { "Content-Type": "application/json" });
      res.write(JSON.stringify(database[id]));
      res.end();
      break;

    case "GET":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(database));
      res.end();
      break;

    default:
      break;
  }
});

server.listen(PORT, "localhost", () => {
  console.log(`Server is running on port ${PORT}`);
});
