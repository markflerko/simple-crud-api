const { v4: uuidv4 } = require("uuid");
const { database } = require("../repository/database");
const { Person } = require("../models/Person");

const createPerson = ({ data }) => {
  try {
    const id = uuidv4();
    database[id] = new Person({ ...data, id });
    return database[id];
  } catch (error) {
    throw error;
  }
};

module.exports = createPerson;
