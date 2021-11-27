const { database } = require("../repository/database");

const readPerson = (id) => {
  return database[id];
};

module.exports = readPerson;
