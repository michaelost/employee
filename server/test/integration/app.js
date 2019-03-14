const path = require('path');
const appRoot = process.cwd();

const app = require(appRoot + '/server/app/app.js');
const setupApi = require(appRoot + '/server/app/apiSetup');

const config = require(appRoot + '/server/config/config');

let instance = null;

module.exports = function() {
  if (!instance) {
    instance = setupApi(app, config.test.port);
    return instance;
  } 
  return instance
};
