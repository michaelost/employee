const express = require('express');
const userRouter = express.Router();

const {
  handleError,
} = require('../middlewares');

const userController = require('../controllers/userController')();

userRouter.get('/',  userController.get);
userRouter.get('/:id', userController.getById);
userRouter.post('/', userController.addUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.put('/:id', userController.updateUser);

userRouter.use(handleError);

module.exports = userRouter;
