const connection = require('../db/createConnection');
const User = require('../models/User');

module.exports = (connection) => {
  async function getAll(query) {
    return User.find({});
  }

  async function getById(id) {
    if (!id) {
      return Promise.reject('invalid input: missing id');
    }
    return User.findById({ _id: id});
  }

  async function addUser(user) {
    if (!user.name || !user.title) {
      return Promise.reject({ error: 'isBlank', path: '[name], [title]' });
    }
    const newUser = new User(user);
    return newUser.save();
  }

  async function deleteUser(_id) {
    if (!_id) {
      return Promise.reject({ error: 'isBlank', path: '[id]' });
    }
    return User.remove({ _id });

  }

  async function updateUser(_id, user) {
    if (!_id || !user) {
      return Promise.reject('invalid input: missing id or fields to update');
    }
    return User.update({ _id }, user);
  }

  return {
    getAll,
    getById,
    addUser,
    deleteUser,
    updateUser,
  };
}
