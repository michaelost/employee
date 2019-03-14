const { Pool } = require('pg')

const createConnection = (config) => {
  console.log('createing db connection with config database ' + config.database);
  return new Pool(config);
}

module.exports = createConnection;
