const bodyParser = require('body-parser');
const userRouter = require('../routers/user');

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/users', userRouter);

  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
  return app;
}
