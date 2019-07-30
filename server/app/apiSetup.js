const bodyParser = require('body-parser');
const userRouter = require('../routers/user');

module.exports = function (app, config) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/users', userRouter);
  console.log("324234231241");

  app.listen(config.port, function () {
    console.log(`Example app listening on port ${config.port}`);
  });
  return app;
}
