module.exports = {
  test: {
    server: {
      port: 8000,
    },
    db: {
      user: 'postgres',
      password: '123qweasdzxcv',
      host: 'localhost',
      database: 'test',
      port: 5432,
    }
  },
  dev: {
    server: {
      port: 3000,
    },
    db: {
      user: 'postgres',
      password: '123qweasdzxcv',
      host: 'localhost',
      database: 'development',
      port: 5432,
    }
  }
};
