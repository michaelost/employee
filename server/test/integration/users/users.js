const request = require('supertest');
const expect = require('chai').expect;
const getApp = require('../app.js');
const app = getApp();

describe('userService test', function () {
  it('POST /users invalid request', function () {
    request(app)
      .post('/users')
      .expect(403)
      .end(function(err, res) {
        if (err) throw err;
      });
  });

  it('POST /users valid request', function () {
    request(app)
      .post('/users')
      .send({
        role: 'parent',
        name: 'testingUser',
      })
      .then(response => {
        expect(response.status).to.equal(200);
      })
  });

  it('GET /users - get all users', function () {
    request(app)
      .get('/users')
      .expect(200)
      .then(response => {
        expect(response.status).to.equal(200);
      })
  });
})
