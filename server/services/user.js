const connection = require('../db/createConnection');
const User = require('../models/User');

module.exports = (connection) => {
  async function getAll(query) {
    return await User.find({});
  }

  async function getById(id) {
    if (!id) {
      return Promise.reject('invalid input: missing id');
    }
    return await User.findById({ _id: id});
  }

  async function addUser(user) {
    console.log('user', user);
    if (!user.name || !user.title) {
      return Promise.reject({ error: 'isBlank', path: '[name], [title]' });
    }
    const newUser = new User(user);
    console.log('newUser', newUser);
    return await newUser.save();
  }

  async function deleteUser(id) {

  }

  async function updateUser(id, user) {
    if (!id || !user) {
      return Promise.reject('invalid input: missing id or fields to update');
    }
  }

  return {
    getAll,
    getById,
    addUser,
    deleteUser,
    updateUser,
  };
}
