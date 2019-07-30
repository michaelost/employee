const createConnection = require('./connection');
const config = require('../config/config');

const connection = createConnection(config.dev.dbName);

module.exports = connection;
