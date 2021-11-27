const createPerson = require("../services/createPerson");
const bodyParser = require("../utils/bodyParser");
const responseBuilder = require("../utils/responseBuilder");

const postPerson = async (req, res) => {
  await bodyParser(req);
  const data = req.body;
  if (
    !data.hasOwnProperty("name") ||
    !data.hasOwnProperty("age") ||
    !data.hasOwnProperty("hobbies")
  ) {
    responseBuilder({
      res,
      code: 400,
      message: `You didn't provide one of required fields, please check name: ${data.name} age: ${data.age} hobbies: ${data.hobbies}\n`,
    });
  } else {
    const person = createPerson({ data });
    responseBuilder({ res, code: 201, body: person });
  }
};

module.exports = postPerson;
