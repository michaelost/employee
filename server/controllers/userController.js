const pool = require('../db/pool');

function UserController(Model) {

 async function getUsers(req, res) {
    const users = await pool.query('SELECT * FROM users');
    res.send(users);
  }

  return {
    get: getUsers,
  };
}

module.exports =  UserController;
