const get =  require('lodash').get;

const retrieveData = (params = []) => {
  return (req, res, next) => {
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
    next();
  }
};


const formatResponseMiddleware = (req, res, next) => {
  const { rows } = req.locals.data;
  if (rows) {
    res.json({ data: rows });
  }
  res.send({});
};

const handleError = (err, req, res, next) => {
  if (err.error == 'isBlank') {
    res.status(403).send({ data: err });
  }
};

module.exports = {
  retrieveData,
  handleError,
  formatResponseMiddleware,
};
