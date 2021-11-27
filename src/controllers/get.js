const readPersons = require("../services/readPersons");
const responseBuilder = require("../utils/responseBuilder");

const get = async (res) => {
  const persons = readPersons();

  responseBuilder({ res, code: 200, body: persons });
};

module.exports = get;
