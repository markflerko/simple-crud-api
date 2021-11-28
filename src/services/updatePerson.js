const { database } = require("../repository/database");

const updatePerson = ({ id, body }) => {
  try {
    database[id] = { ...database[id], ...body };
    return database[id];
  } catch (error) {
    throw error;
  }
};

module.exports = updatePerson;
