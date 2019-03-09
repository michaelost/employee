const pool = require('../db/pool');

const pgQueries = {
  selectAll: 'SELECT name, role from users',
};

function convertQueryStringToSelectCondition(query) {
  const { name, role } = query;
  debugger;
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

function formInsertQuery (tableName, item) {
  const values = Object.values(item).map(el => `'${el}'`).join(',');
  const columns = Object.keys(item);
  return `INSERT INTO ${tableName}(${columns}) values(${values})`;
}

async function getAll(query) {
  return await pool.query(convertQueryStringToSelectCondition(query));
}

async function getById(id) {
  return await pool.query('SELECT name, role FROM users WHERE id=' + id);
}

async function addUser(user) {
  const { name, role } = user;
  if (!role && !name) {
    return Promise.reject('invalid input: missing fields (name or role)');
  }
  return await pool.query(formInsertQuery('users', user));
}

module.exports = {
  getAll,
  getById,
  addUser,
};
