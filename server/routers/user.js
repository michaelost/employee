const express = require('express');
const userRouter = express.Router();

const User = require('../models/user');

const userController = require('../controllers/userController')(User);

userRouter.get('/', userController.get);
userRouter.get('/:id', userController.getById);
userRouter.post('/', userController.addUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.put('/:id', userController.updateUser);
module.exports = userRouter;
