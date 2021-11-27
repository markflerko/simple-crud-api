const { database } = require("../repository/database");

const readPersons = () => {
  return database;
};

module.exports = readPersons;
