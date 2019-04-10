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

  return {
    getAll,
    deleteBy,
    updateGroup,
  };
}
