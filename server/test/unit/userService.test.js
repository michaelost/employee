const sinon = require('sinon');
const expect = require('chai').expect;
const appRoot = process.cwd();

const createService = require(appRoot + '/server/services/user.js');

describe('userService test', function () {

  const connection = {};

  connection.query = function () { return Promise.resolve([]) }
  const st = sinon.stub(connection, 'query');
  const userService = createService(connection);

  describe('getAll', function (done) {
    it('passing name and role args', function (done) {
      const query = { role: 'testrole', name: 'testuser' };
      const supposedCalledString = 'SELECT name, role FROM users WHERE name=\'testuser\' AND role=\'testrole\'';
      userService.getAll(query).then(result => {
        expect(st.calledWith(supposedCalledString)).to.equal(true);
        done();
      }).catch(err => done(err));
    })

    it('passing only name', function (done) {
      const query = { name: 'testuser' };
      const supposedCalledString = 'SELECT name, role FROM WHERE name=\'testuser\'';
      userService.getAll(query).then(result => {
        expect(st.calledWith(supposedCalledString)).to.equal(true);
        done();
      }).catch(err => done(err));
    })

    it('without name and role', function (done) {
      const query = {};
      const supposedCalledString = 'SELECT name, role FROM users';
      userService.getAll(query).then(result => {
        expect(st.calledWith(supposedCalledString)).to.equal(true);
        done();
      }).catch(err => done(err));
    })
  });


  describe('getById', function (done) {
    it('passing ip', function (done) {
      const id = '123';
      const supposedCalledString = 'SELECT name,role FROM users WHERE id=123';
      userService.getById(id).then(result => {
        console.log('supposedCalledString');
        console.log(supposedCalledString);

        expect(st.calledWith(supposedCalledString)).to.equal(true);
        done();
      }).catch(err => done(err));
    })
  });

});
