const path = require('path');
const fs = require('fs');

const app = require('./server/app/app.js');
const connection = require('./server/db/createConnection');

const initiateDb = require('./server/db/init.js');

initiateDb();

const setupApi = require('./server/app/apiSetup');
setupApi(app, { port: 3000 });
