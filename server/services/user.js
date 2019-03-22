const connection = require('../db/createConnection');
const queryBuilder = require('../helpers/queryBuilder');


module.exports = (connection) => {
  const pgQueries = {
    selectAll: 'SELECT name, role FROM users',
  };

  function convertQueryStringToSelectCondition(query) {
    const { name, role } = query;
    if (name || role) {
      let condition = '';
      if (name && role) {
        condition = ` WHERE name='${name}' AND role='${role}'`;
      } else if (name || role) {
        condition = ` WHERE ${(name ? 'name=\'' + name : 'role=\'' + role) + '\''}`
      }
      return pgQueries.selectAll.concat(condition);
    }
    return pgQueries.selectAll;
  }

  async function getAll(query) {
    return await connection.query(convertQueryStringToSelectCondition(query));
  }

  async function getById(id) {
    if (!id) {
      return Promise.reject('invalid input: missing id');
    }
    return await connection.query(queryBuilder.getById('users', ['name', 'role'], id));

  }

  async function addUser(user) {
    return !user.role || !user.name ?
      Promise.reject({ error: 'isBlank', path: '[name], [role]' }) :
      await connection.query(queryBuilder.insert('users', user));
  }

  async function deleteUser(id) {
    return await connection.query(queryBuilder.deleteById('users', id));
  }

  async function updateUser(id, user) {
    return (!id || !user) ?
      Promise.reject('invalid input: missing id or fields to update') :
      connection.query(queryBuilder.upsert('users', { ...user, id }));
  }

  return {
    getAll,
    getById,
    addUser,
    deleteUser,
    updateUser,
  };
}
