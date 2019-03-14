const request = require('supertest');
const getApp = require('../app.js');
const app = getApp();

describe('userService test', function () {
  it('POST /users', function () {
    it('sending empty body should get 403', function () {
      request(app)
        .post('/users')
        .expect(403)
        .end(function(err, res) {
          if (err) throw err;
        });
    });
  });
})
