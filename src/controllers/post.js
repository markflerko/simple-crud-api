const createPerson = require("../services/createPerson");
const bodyParser = require("../utils/bodyParser");
const responseBuilder = require("../utils/responseBuilder");

const post = async (req, res) => {
  await bodyParser(req);
  const person = createPerson({ data: req.body });
  responseBuilder({ res, code: 201, body: person });
};

module.exports = post;
