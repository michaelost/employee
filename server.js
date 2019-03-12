const app = require('./server/app/app.js');

const db = require('./server/db/init.js');

const setupApi = require('./server/app/apiSetup');
setupApi(app);
