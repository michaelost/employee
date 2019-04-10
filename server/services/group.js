const queryBuilder = require('../helpers/queryBuilder');

module.exports = (connection) => {
  const pgQueries = {
    selectAll: 'SELECT name FROM groups',
    selectByName: name => `SELECT name FROM groups WHERE name='${name}'`
  };

  async function getAll(query) {
    const selectQuery = query.name ? pgQueries.selectByName(query.name) : pgQueries.selectAll;
    return await connection.query(selectQuery);
  }

  async function getById(id) {
    if (!id) {
      return Promise.reject('invalid input: missing id');
    }
    return await connection.query(queryBuilder.getById('groups', ['name'], id));
  }

  async function deleteBy(propName, value) {
    if (propName, value) {
      return await connection.query(queryBuilder.deleteBy('groups', propName, value));
    }
    return Promise.reject({ error: 'isBlank', path: '[]' });
  }

  async function updateGroup(id, group) {
    return (!id || !group) ?
      Promise.reject('invalid input: missing id or fields to update') :
      connection.query(queryBuilder.upsert('groups', { ...group, id }));
  }

  async function addGroup(group) {
    return !group.name ?
      Promise.reject({ error: 'isBlank', path: '[name]' }) :
      await connection.query(queryBuilder.insert('groups', group));
  }

  return {
    getAll,
    getById,
    deleteBy,
    updateGroup,
    addGroup,
  };
}
