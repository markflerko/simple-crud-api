const readPersons = require("../services/readPersons");
const responseBuilder = require("../utils/responseBuilder");
const getIdFromReq = require("../utils/getPathFromReq");

const getPersons = async (req, res) => {
  try {
    const persons = readPersons();
    responseBuilder({ res, code: 200, body: persons });
  } catch (error) {
    throw error;
  }
};

module.exports = getPersons;
