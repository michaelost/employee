module.exports = {
  test: {
    port: 8000,
  },
  dev: {
    server: {
      port: 3000,
    },
    db: {
      user: 'postgres',
      password: '123qweasdzxcv',
      host: 'localhost',
      database: 'test',
      port: 5432,
    }
  }
};
