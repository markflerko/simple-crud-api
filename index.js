const http = require("http");
const postPerson = require("./src/controllers/postPerson");
const getPersons = require("./src/controllers/getPersons");
const getPerson = require("./src/controllers/getPerson");
const delPerson = require("./src/controllers/delPerson");
const putPerson = require("./src/controllers/putPerson");
const responseBuilder = require("./src/utils/responseBuilder");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  try {
    const { method, url } = req;
    const path_full = url.split("/").slice(1);
    const [path, person_id] = path_full;

    if (path !== "person" || path_full.length >= 3) {
      console.log(`received ${method}-request on ${url}`);
      responseBuilder({
        res,
        code: 404,
        message: "Sorry but no other routes than person exist\n",
      });
    } else {
      switch (method) {
        case "POST":
          await postPerson(req, res);
          break;

        case "GET":
          if (!person_id) {
            await getPersons(res);
          } else {
            await getPerson({ res, id: person_id });
          }
          break;

        case "DELETE":
          await delPerson({ res, id: person_id });
          break;

        case "PUT":
          await putPerson({ res, req, id: person_id });
          break;

        default:
          break;
      }
    }
  } catch (error) {
    console.log(error);
    responseBuilder({
      res,
      code: 500,
      message: "Sorry, internal server error has occured",
    });
  }
});

server.listen(PORT, "localhost", () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
