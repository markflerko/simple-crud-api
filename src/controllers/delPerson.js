const deletePerson = require("../services/deletePerson");
const { database } = require("../repository/database");
const isUuid = require("../utils/isUuid");
const responseBuilder = require("../utils/responseBuilder");

const delPerson = async ({ res, id }) => {
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
    const isPersonDeleted = deletePerson(id);
    if (isPersonDeleted) {
      responseBuilder({ res, code: 204 });
    }
  }
};

module.exports = delPerson;
