const { Pool } = require('pg')

const createConnection = (config) => {
  return new Pool({
    user: config.user,
    password: config.password,
    host: config.host,
    database: config.database,
    port: config.port,
  });
}

module.exports = createConnection;
