const { database } = require("../repository/database");

const readPersons = () => {
  try {
    return database;
  } catch (error) {
    throw error;
  }
};

module.exports = readPersons;
