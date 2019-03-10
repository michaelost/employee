const pool = require('../db/pool');
const queryBuilder = require('../helpers/queryBuilder');

const pgQueries = {
  selectAll: 'SELECT name, role from users',
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
  return await pool.query(convertQueryStringToSelectCondition(query));
}

async function getById(id) {
  return await pool.query(queryBuilder.getById('users', ['name', 'role'], id));
}

async function addUser(user) {
  return !user.role || !user.name ?
    Promise.reject('invalid input: missing fields (name or role)') :
    await pool.query(queryBuilder.insert('users', user));
}

async function deleteUser(id) {
  return await pool.query(queryBuilder.deleteById('users', id));
}

async function updateUser(id, user) {
  return (!id || !user) ?
    Promise.reject('invalid input: missing id or fields to update') :
    pool.query(queryBuilder.upsert('users', { ...user, id }));
}

module.exports = {
  getAll,
  getById,
  addUser,
  deleteUser,
  updateUser,
};
