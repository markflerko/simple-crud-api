const updatePerson = require("../services/updatePerson");
const { database } = require("../repository/database");
const isUuid = require("../utils/isUuid");
const responseBuilder = require("../utils/responseBuilder");
const bodyParser = require("../utils/bodyParser");
const getIdFromReq = require("../utils/getPathFromReq");

const putPerson = async (req, res) => {
  try {
    const id = getIdFromReq(req);

    await bodyParser(req);
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
      const updatedPerson = updatePerson({ id, body: req.body });
      responseBuilder({ res, code: 200, body: updatedPerson });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = putPerson;
