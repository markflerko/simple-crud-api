const { database } = require("../repository/database");

const readPerson = (id) => {
  try {
    return database[id];
  } catch (error) {
    throw error;
  }
};

module.exports = readPerson;
