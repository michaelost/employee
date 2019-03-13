const { Client, Pool } = require('pg')

const client = new Client();

const pool = new Pool({
  user: 'postgres',
  password: '123qweasdzxcv',
  host: 'localhost',
  database: 'test',
  port: 5432,
})

module.exports = pool;
