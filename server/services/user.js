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

async function getAll(query) {
  return await pool.query(convertQueryStringToSelectCondition(query));
}

async function getById(id) {
  return await pool.query('SELECT name, role FROM users WHERE id=' + id);
}

module.exports = {
  getAll,
  getById,
};
