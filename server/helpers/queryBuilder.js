const getValues = (object) => Object.values(object).map(el => `'${el}'`).join(',');

const getKeys = (object) => Object.keys(object).map(el => `${el}`).join(',');

const formInsertQuery = (tableName, item) => {
  const values = getValues(item);
  const columns = Object.keys(item);
  return `INSERT INTO ${tableName}(${columns}) values(${values})`;
}

const formUpsertQuery = (tableName, item) => (`${formInsertQuery(tableName, item)} on conflict(id) do update set (${getKeys(item)}) = (${getValues(item)})`);

const QueryBuilder = {
  insert: (tableName, item) => (formInsertQuery(tableName, item)),
  getById: (tableName, fields, id) => (`SELECT ${fields.join(',')} FROM ${tableName} WHERE id=${id}`),
  deleteById: (tableName, id) => (`DELETE FROM ${tableName}  WHERE id=${id}`),
  upsert: (tableName, item) => (formUpsertQuery(tableName, item)),
};

module.exports = QueryBuilder;
