const http = require("http");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("./src/utils/bodyParser");
const isUuid = require("./src/utils/isUuid");
const post = require("./src/controllers/post");
const get = require("./src/controllers/get");
const getOne = require("./src/controllers/getOne");
const responseBuilder = require("./src/utils/responseBuilder");
const { database } = require("./src/repository/database");
const deletePerson = require("./src/services/deletePerson");
const updatePerson = require("./src/services/updatePerson");

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
      post(req, res);
      break;

    case "GET":
      if (!person_id) {
        get(res);
      } else {
        getOne({res, id: person_id});
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
