const connection = require('../db/createConnection');
const userService = require('../services/user')(connection);

const sendResponse = res => result => res.send({ result });

const handleError = res => error => {
  res.status(403).send({ error });
}

const controllerWrapper = (callback) => (
  async (req, res, next) => {
    console.log('req.body', req.body);
    console.log('==================');
    try {
      req.locals.data = await callback(req.locals.data);
      next();
    } catch(err) {
      next(err);
    }
  }
);

function UserController() {
 const getUsers = (query) => userService.getAll(query);
 const getById = ({ id }) =>  userService.getById(id);
 const addUser = (data) =>  userService.addUser(data.body);
 const deleteUser = ({ id }) => userService.deleteUser(id);
 const updateUser = ({ id, data }) => userService.updateUser(id, data);

  return {
    get: controllerWrapper(getUsers),
    getById: controllerWrapper(getById),
    addUser: controllerWrapper(addUser),
    deleteUser: controllerWrapper(deleteUser),
    updateUser: controllerWrapper(updateUser),
  };
}

module.exports =  UserController;
