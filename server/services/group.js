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

  return {
    getAll,
    deleteBy,
  };
}
