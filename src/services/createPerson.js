const { v4: uuidv4 } = require("uuid");
const { database } = require("../repository/database");

const createPerson = ({ data }) => {
  const id = uuidv4();
  database[id] = { ...data, id };
  return database[id];
};

module.exports = createPerson;
