const sinon = require('sinon');
const expect = require('chai').expect;
const appRoot = process.cwd();

const createService = require(appRoot + '/server/services/user.js');

describe('userService test', function () {

  const connection = {};

  connection.query = function () { return Promise.resolve([]) }
  let st = sinon.stub(connection, 'query');
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
//        expect(st.calledWith(supposedCalledString)).to.equal(true);
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
    beforeEach(function() {
      st.restore();
      st = sinon.stub(connection, 'query');
    });

    it('passing ip', function (done) {
      const id = '123';
      const supposedCalledString = 'SELECT name,role FROM users WHERE id=123';
      userService.getById(id).then(result => {
        expect(st.calledWith(supposedCalledString)).to.equal(true);
        expect(st.called).to.equal(true);
        done();
      }).catch(err => done(err));
    })

    it('missing id', function (done) {
      userService.getById().then(result => {
        done()
      }).catch(err => {
        expect(st.called).to.equal(false);
        done();
      }) 
    })

  });


  describe('addUser', function (done) {
    beforeEach(function() {
      st.restore();
      st = sinon.stub(connection, 'query');
    });

    it('adding user: passing role and name', function (done) {
      const supposedCalledString = 'INSERT INTO users(name,role) values(\'user\',\'role\')';
      const user = { name: 'user', role: 'role' };
      userService.addUser(user).then(result => {
        expect(st.calledWith(supposedCalledString)).to.equal(true);
        expect(st.called).to.equal(true);
        done();
      }).catch(err => done(err));
    })

    it('adding user: missing role or name ', function (done) {
      userService.addUser({}).then(result => {
        done()
      }).catch(err => {
        expect(err.error).to.equal('isBlank');
        expect(st.called).to.equal(false);
        done();
      }) 
    })

  });


});
