const http = require("http");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("./src/utils/bodyParser");
const isUuid = require("./src/utils/isUuid");
const createPerson = require("./src/services/createPerson");
const readPersons = require("./src/services/readPersons");
const responseBuilder = require("./src/utils/responseBuilder");
const { database } = require("./src/repository/database");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  const [path, person_id] = url.split("/").slice(1);
  console.log(`path: ${path}`, `id: ${person_id}`);

  if (path !== "person") {
    console.log(`received ${method}-request on ${url}`);
    res.write("Sorry but we dont have other routes than person \n");
    res.end();
  }

  switch (method) {
    case "POST":
      await bodyParser(req);
      const person = createPerson({ data: req.body });
      responseBuilder({ res, code: 201, body: person });
      break;

    case "GET":
      if (!person_id) {
        const persons = readPersons();

        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(persons));
        res.end();
      } else {
        if (!isUuid(person_id)) {
          res.write(`Sorry but id: ${person_id} doesnt match uuid format \n`);
          res.statusCode = 400;
          res.end();
        } else if (!database.hasOwnProperty(person_id)) {
          res.write(`Sorry but no user with ${person_id} exist \n`);
          res.statusCode = 404;
          res.end();
        } else {
          res.writeHead(201, { "Content-Type": "application/json" });
          res.write(JSON.stringify(database[person_id]));
          res.end();
        }
      }
      break;

    case "DELETE":
      if (!isUuid(person_id)) {
        res.write(`Sorry but id: ${person_id} doesnt match uuid format \n`);
        res.statusCode = 400;
        res.end();
      } else if (!database.hasOwnProperty(person_id)) {
        res.write(`Sorry but no user with ${person_id} exist \n`);
        res.statusCode = 404;
        res.end();
      } else {
        const isPersonDeleted = delete database[person_id];
        if (isPersonDeleted) {
          res.writeHead(204, { "Content-Type": "application/json" });
          res.end();
        }
      }
      break;

    case "PUT":
      await bodyParser(req);
      if (!isUuid(person_id)) {
        res.write(`Sorry but id: ${person_id} doesnt match uuid format \n`);
        res.statusCode = 400;
        res.end();
      } else if (!database.hasOwnProperty(person_id)) {
        res.write(`Sorry but no user with ${person_id} exist \n`);
        res.statusCode = 404;
        res.end();
      } else {
        database[person_id] = { ...database[person_id], ...req.body };
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(database[person_id]));
        res.end();
      }
      break;

    default:
      break;
  }
});

server.listen(PORT, "localhost", () => {
  console.log(`Server is running on port ${PORT}`);
});
