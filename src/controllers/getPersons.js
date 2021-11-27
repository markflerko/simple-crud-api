const readPersons = require("../services/readPersons");
const responseBuilder = require("../utils/responseBuilder");

const getPersons = async (res) => {
  const persons = readPersons();

  responseBuilder({ res, code: 200, body: persons });
};

module.exports = getPersons;
