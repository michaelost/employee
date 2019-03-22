const express = require('express');
const userRouter = express.Router();

const User = require('../models/user');

const userController = require('../controllers/userController')(User);


userRouter.get('/', userController.get);
userRouter.get('/:id', userController.getById);
userRouter.post('/', userController.addUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.put('/:id', userController.updateUser);


//userRouter.use(formatResponseMiddleware);
/*function formatResponseMiddleware (req, res, next) {
  if (res.body.result && res.body.result.rows) {
    res.body = res.body.result.rows;
  }
  next();
};
*/

module.exports = userRouter;
