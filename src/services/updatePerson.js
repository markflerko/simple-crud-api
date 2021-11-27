const { database } = require("../repository/database");

const updatePerson = ({ id, body }) => {
  database[id] = { ...database[id], ...body };
  return database[id];
};

module.exports = updatePerson;
