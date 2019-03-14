const createConnection = require('./connection');
const config = require('../config/config');

const connection = createConnection(config.dev.db);

module.exports = connection;
