const connection = require('../db/createConnection');
const groupService = require('../services/group')(connection);

const sendResponse = res => result => res.send({ result });
const handleError = res => error => {
  res.status(403).send({ error });
}

const controllerWrapper = (callback) => (
  async (req, res, next) => {
    try {
      req.locals.data = await callback(req.locals.data);
      next();
    } catch(err) {
      console.log('catch...');
      console.log('err', err);
      next(err);
    }
  }
);

function GroupController(Model) {
 const getGroups = (query) => groupService.getAll(query);
 const getById = ({ id }) =>  groupService.getById(id);
 const addGroup = (data) =>  groupService.addGroup(data.body);
 const deleteGroup = (propName, value) => groupService.deleteBy(propName, value);
 const updateGroup = ({ id, data }) => groupService.updateGroup(id, data);
   return {
     get: controllerWrapper(getGroups),
     getById: controllerWrapper(getById),
     addGroup: controllerWrapper(addGroup),
     deleteGroup: controllerWrapper(deleteGroup),
     updateGroup: controllerWrapper(updateGroup),
   };
}

module.exports =  GroupController;
