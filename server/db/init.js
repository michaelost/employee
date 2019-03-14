const initiateDB = (connection, sqlString) => {
  connection.query(sqlString);
}

module.exports = initiateDB;
