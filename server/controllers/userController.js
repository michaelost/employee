function UserController(Model) {

  function getUsers(req, res) {
    const users = Model.findAll();
    res.send(users);

  }

  return {
    get: getUsers,
  };
}

module.exports =  UserController;
