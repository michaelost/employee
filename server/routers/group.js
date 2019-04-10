const express = require('express');
const groupRouter = express.Router();

const {
  retrieveData,
  handleError,
  formatResponseMiddleware,
} = require('../middlewares/user');


const groupController = require('../controllers/groupController')();

const retrieve = {
  groupsGet: retrieveData(['req.query']),
  groupsGetById: retrieveData(['req.params.id']),
  groupsPost: retrieveData(['req.body']),
  groupsDelete: retrieveData(['req.params.id']),
  updateUser: retrieveData(['req.params.id', 'req.body']),
}

groupRouter.get('/', retrieve.groupsGet, groupController.get);
groupRouter.get('/:id', retrieve.groupsGetById, groupController.getById);
groupRouter.post('/', retrieve.groupsPost, groupController.addGroup);
groupRouter.delete('/:id', retrieve.groupsDelete, groupController.deleteGroup);
groupRouter.put('/:id', retrieve.updateUser, groupController.updateGroup);

groupRouter.use(formatResponseMiddleware);
groupRouter.use(handleError);

module.exports = groupRouter;
