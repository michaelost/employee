const express = require('express');
const userRouter = express.Router();

const User = require('../models/user');

const userController = require('../controllers/userController')(User);

userRouter.get('/', userController.get);

module.exports = userRouter;
