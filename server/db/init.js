const pool = require('./pool');
const path = require('path');
const fs = require('fs');

const initTables = fs.readFileSync(path.resolve(__dirname, './queries/init.sql')).toString();

pool.query(initTables)

