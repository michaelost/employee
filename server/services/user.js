const connection = require('../db/createConnection');

module.exports = (connection) => {
  async function getAll(query) {

  }

  async function getById(id) {
    if (!id) {
      return Promise.reject('invalid input: missing id');
    }
  }

  async function addUser(user) {
    if (!user.role || !user.name) {
      return Promise.reject({ error: 'isBlank', path: '[name], [role]' });
    }
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
