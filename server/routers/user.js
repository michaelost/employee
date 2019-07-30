const express = require('express');
const userRouter = express.Router();
const Users = require('../models/User');

const {
  handleError,
  retrieveData,
  formatResponseMiddleware,
} = require('../middlewares');

const userController = require('../controllers/userController')();

const retrieve = {
  usersGet: retrieveData(['req.query']),
  usersGetById: retrieveData(['req.params.id']),
  usersPost: retrieveData(['req.body']),
  usersDelete: retrieveData(['req.params.id']),
  updateUser: retrieveData(['req.params.id', 'req.body']),
}

userRouter.get('/', retrieve.usersGet, userController.get);
userRouter.get('/:id', retrieve.usersGetById, userController.getById);
/*
userRouter.post('/',  function (req, res) {
  console.log('req.body', req.body);
  res.send({})
});
*/
userRouter.post('/', retrieve.usersPost, userController.addUser, formatResponseMiddleware);
userRouter.delete('/:id', retrieve.usersDelete, userController.deleteUser);
userRouter.put('/:id', retrieve.updateUser, userController.updateUser);

userRouter.use(formatResponseMiddleware);
userRouter.use(handleError);

module.exports = userRouter;
