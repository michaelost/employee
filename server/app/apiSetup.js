const bodyParser = require('body-parser');
const userRouter = require('../routers/user');
const groupRouter = require('../routers/group');

module.exports = function (app, config) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/users', userRouter);
  app.use('/groups', groupRouter);

  app.listen(config.port, function () {
    console.log(`Example app listening on port ${config.port}`);
  });
  return app;
}
