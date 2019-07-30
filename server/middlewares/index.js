const get =  require('lodash').get;

const handleError = (err, req, res, next) => {
  console.log('err', err);
  if (err.error == 'isBlank') {
    res.status(403).send({ data: err });
  }
};

const retrieveData = (params = []) => {
  return (req, res, next) => {

    console.log('req.body', req.body);
    console.log('=========================');
    if (!req.locals) {
      req.locals = {};
    }
    req.locals.data = params.reduce((acc, el) => {
      const propChain = el.replace(/req./, '');
      const propChainSplit = propChain.split('.');
      const propChainSplitLen = propChainSplit.length;
      const propName = propChainSplit[propChainSplitLen > 1 ? propChainSplitLen -1 : 0];
      const value = get(req, propChain)
      acc[propName] = value;
      return acc;
    }, {});
    console.log('req.body', req.body);
    next();
  }
};

const formatResponseMiddleware = (req, res, next) => {
  console.log('res.locals.data', res.locals.data);
  const { rows } = req.locals.data;
  if (rows) {
    res.json({ data: rows });
  }
  res.send({});
}

module.exports = {
  retrieveData,
  handleError,
  formatResponseMiddleware,
};
