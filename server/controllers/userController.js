const connection = require('../db/createConnection');
const userService = require('../services/user')(connection);

const sendResponse = res => result => res.send({ result });
const handleError = res => error => {
  res.status(403).send({ error });
}

function UserController(Model) {
 const getUsers = (req, res) => userService.getAll(req.query)
   .then(sendResponse(res))
   .catch(handleError(res));

 const getById = (req, res) => userService.getById(req.params.id)
   .then(sendResponse(res))
   .catch(handleError(res));

 const addUser = (req, res) => userService.addUser(req.body)
   .then(sendResponse(res))
   .catch(handleError(res));

 const deleteUser = (req, res) => userService.deleteUser(req.params.id)
   .then(sendResponse(res))
   .catch(handleError(res));

 const updateUser = (req, res) => userService.updateUser(req.params.id, req.body)
   .then(sendResponse(res))
   .catch(handleError(res));

  return {
    get: getUsers,
    getById,
    addUser,
    deleteUser,
    updateUser,
  };
}

module.exports =  UserController;
