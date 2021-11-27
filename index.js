const http = require("http");
const bodyParser = require("./src/utils/bodyParser");
const isUuid = require("./src/utils/isUuid");
const postPerson = require("./src/controllers/postPerson");
const getPersons = require("./src/controllers/getPersons");
const getPerson = require("./src/controllers/getPerson");
const responseBuilder = require("./src/utils/responseBuilder");
const { database } = require("./src/repository/database");
const delPerson = require("./src/controllers/delPerson");
const putPerson = require("./src/controllers/putPerson");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  const [path, person_id] = url.split("/").slice(1);

  if (path !== "person") {
    console.log(`received ${method}-request on ${url}`);
    res.write("Sorry but we dont have other routes than person \n");
    res.end();
  }

  switch (method) {
    case "POST":
      postPerson(req, res);
      break;

    case "GET":
      if (!person_id) {
        getPersons(res);
      } else {
        getPerson({ res, id: person_id });
      }
      break;

    case "DELETE":
      delPerson({ res, id: person_id });
      break;

    case "PUT":
      putPerson({ res, req, id: person_id });
      break;

    default:
      break;
  }
});

server.listen(PORT, "localhost", () => {
  console.log(`Server is running on port ${PORT}`);
});
