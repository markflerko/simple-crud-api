const http = require("http");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("./src/utils/bodyParser");
const isUuid = require("./src/utils/isUuid");
const createPerson = require("./src/services/createPerson");
const readPersons = require("./src/services/readPersons");
const responseBuilder = require("./src/utils/responseBuilder");
const { database } = require("./src/repository/database");
const deletePerson = require("./src/services/deletePerson");
const updatePerson = require("./src/services/updatePerson");
const readPerson = require("./src/services/readPerson");

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

        responseBuilder({ res, code: 200, body: persons });
      } else {
        if (!isUuid(person_id)) {
          responseBuilder({
            res,
            code: 400,
            message: `Sorry but id: ${person_id} doesnt match uuid format \n`,
          });
        } else if (!database.hasOwnProperty(person_id)) {
          responseBuilder({
            res,
            code: 404,
            message: `Sorry but no user with ${person_id} exist \n`,
          });
        } else {
          const person = readPerson(person_id);

          responseBuilder({
            res,
            code: 200,
            body: person,
          });
        }
      }
      break;

    case "DELETE":
      if (!isUuid(person_id)) {
        responseBuilder({
          res,
          code: 400,
          message: `Sorry but id: ${person_id} doesnt match uuid format \n`,
        });
      } else if (!database.hasOwnProperty(person_id)) {
        responseBuilder({
          res,
          code: 404,
          message: `Sorry but no user with ${person_id} exist \n`,
        });
      } else {
        const isPersonDeleted = deletePerson(person_id);
        if (isPersonDeleted) {
          responseBuilder({ res, code: 204 });
        }
      }
      break;

    case "PUT":
      await bodyParser(req);
      if (!isUuid(person_id)) {
        responseBuilder({
          res,
          code: 400,
          message: `Sorry but id: ${person_id} doesnt match uuid format \n`,
        });
      } else if (!database.hasOwnProperty(person_id)) {
        responseBuilder({
          res,
          code: 404,
          message: `Sorry but no user with ${person_id} exist \n`,
        });
      } else {
        const updatedPerson = updatePerson({ id: person_id, body: req.body });
        responseBuilder({ res, code: 200, body: updatedPerson });
      }
      break;

    default:
      break;
  }
});

server.listen(PORT, "localhost", () => {
  console.log(`Server is running on port ${PORT}`);
});
