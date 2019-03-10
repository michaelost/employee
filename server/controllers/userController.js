const pool = require('../db/pool');
const userService = require('../services/user');

function UserController(Model) {

 async function getUsers(req, res) {
   try {
     const users = await userService.getAll(req.query);
     res.send({ users });
   } catch(err) {
     console.log('err', err);
     res.sendStatus(500);
   }
 } 

 async function getById(req, res) {
   try {
     const user = await userService.getById(req.params.id);
     res.send({ user });
   } catch(err) {
     console.log('err', err);
     res.sendStatus(500);
   }
 }

  async function addUser(req, res) {
    try {
      const user = await userService.addUser(req.body);
      res.send({ user });
    } catch(err) {
      res.status(403).send({ err });
    }
  }

  async function deleteUser(req, res) {
    try {
      const user = await userService.deleteUser(req.params.id);
      res.send({ success: true });
    } catch(err) {
      console.log('err', err);
      res.status(403).send({ err });
    }
  }

  async function updateUser(req, res) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.send({ success: true });
    } catch(err) {
      console.log('err', err);
      res.status(403).send({ err });
    }
  }

  return {
    get: getUsers,
    getById,
    addUser,
    deleteUser,
    updateUser,
  };
}

module.exports =  UserController;
