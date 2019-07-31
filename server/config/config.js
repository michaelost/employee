module.exports = {
  test: {
    server: {
      port: 8000,
    },
    dbName: 'test'
  },
  dev: {
    server: {
      port: 3000,
    },
    dbName: 'dev',
  },
  authServer: 'http://localhost:8080'
};
