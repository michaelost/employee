const sinon = require('sinon');
const expect = require('chai').expect;
const appRoot = process.cwd();

const createService = require(appRoot + '/server/services/group.js');

describe('userService test', function () {
  const connection = {};
  connection.query = function () { return Promise.resolve([]) }
  let st = sinon.stub(connection, 'query');
  const groupService = createService(connection);

  describe('getAll', function (done) {
    it('should get all groups', function (done) {
      const query = {};
      const supposedCalledString = 'SELECT name FROM groups'; 
      groupService.getAll(query).then(result => {
        expect(st.calledWith(supposedCalledString)).to.equal(true);
        done();
      }).catch(err => {
        done(err);
      });
    })

    it('should get groups by name', function (done) {
      const query = { name: 'user' };
      const supposedCalledString = 'SELECT name FROM groups WHERE name=\'user\''; 
      groupService.getAll(query).then(result => {
        expect(st.calledWith(supposedCalledString)).to.equal(true);
        done();
      }).catch(err => {
        done(err);
      });
    });

    it('should delete group by name', function (done) {
      const supposedCalledString = 'DELETE FROM groups WHERE name=user';
      groupService.deleteBy('name', 'user').then(result => {
        expect(st.calledWith(supposedCalledString)).to.equal(true);
        done();
      }).catch(err => {
        done(err);
      });
    });

    it('should update group by id ', function (done) {
      const supposedCalledString = 'INSERT INTO groups(name,id) values(\'group1\',\'1\') on conflict(id) do update set (name,id) = (\'group1\',\'1\')';
      groupService.updateGroup(1, { name: 'group1' }).then(result => {
        expect(st.calledWith(supposedCalledString)).to.equal(true);
        done();
      }).catch(err => {
        done(err);
      });
    });

    it('should fail on update group by id (missed id) ', function (done) {
      groupService.updateGroup(null, { name: 'group1' }).then(result => {
        done();
      }).catch(err => {
        expect(err).to.equal('invalid input: missing id or fields to update');
        done();
      });
    });

    it('shouldn add new group', function (done) {
      const supposedCalledString ='INSERT INTO groups(name) values(\'group1\')';
      groupService.addGroup({ name: 'group1' }).then(result => {
        expect(st.calledWith(supposedCalledString)).to.equal(true);
        done();
      }).catch(err => {
        done(err);
      });
    });

  });
});
