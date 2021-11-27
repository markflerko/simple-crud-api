const createPerson = require("../services/createPerson");
const bodyParser = require("../utils/bodyParser");
const responseBuilder = require("../utils/responseBuilder");

const postPerson = async (req, res) => {
  await bodyParser(req);
  const person = createPerson({ data: req.body });
  responseBuilder({ res, code: 201, body: person });
};

module.exports = postPerson;
