const { database } = require("../repository/database");

const deletePerson = (id) => {
  return delete database[id];
};

module.exports = deletePerson;
