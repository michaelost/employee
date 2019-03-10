const pool = require('../db/pool');

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

const getValues = (object) => Object.values(object).map(el => `'${el}'`).join(',');
const getKeys = (object) => Object.keys(object).map(el => `${el}`).join(',');
const formUpsertQuery = (tableName, item) => (`${formInsertQuery(tableName, item)} on conflict(id) do update set (${getKeys(item)}) = (${getValues(item)})`);

function formInsertQuery (tableName, item) {
  const values = getValues(item);
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

async function deleteUser(id) {
  return await pool.query('DELETE FROM users WHERE id=' + id);
}

async function updateUser(id, user) {
  if (!id && !user) {
    return Promise.reject('invalid input: missing id or fields to update');
  }
  const upsertQuery = formUpsertQuery('users', { ...user, id });
  return pool.query(upsertQuery);
}

module.exports = {
  getAll,
  getById,
  addUser,
  deleteUser,
  updateUser,
};
