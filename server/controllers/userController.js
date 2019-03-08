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
     res.sendStatus(500);
   }
 }

  return {
    get: getUsers,
    getById,
  };
}

module.exports =  UserController;