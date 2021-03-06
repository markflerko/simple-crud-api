const { database } = require("../repository/database");
const readPerson = require("../services/readPerson");
const isUuid = require("../utils/isUuid");
const responseBuilder = require("../utils/responseBuilder");

const getPerson = async ({ res, id }) => {
  try {
    if (!isUuid(id)) {
      responseBuilder({
        res,
        code: 400,
        message: `Sorry but id: ${id} doesnt match uuid format \n`,
      });
    } else if (!database.hasOwnProperty(id)) {
      responseBuilder({
        res,
        code: 404,
        message: `Sorry but no user with ${id} exist \n`,
      });
    } else {
      const person = readPerson(id);

      responseBuilder({
        res,
        code: 200,
        body: person,
      });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = getPerson;
