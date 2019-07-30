//const { Pool } = require('pg')
const mongoose = require('mongoose');

const createConnection = (dbName) => {
  return mongoose.connect(`mongodb://localhost/${dbName}`, {useNewUrlParser: true});
};

module.exports = createConnection;
