const { database } = require("../repository/database");

const deletePerson = (id) => {
  try {
    return delete database[id];
  } catch (error) {
    throw error;
  }
};

module.exports = deletePerson;
