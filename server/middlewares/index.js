const get =  require('lodash').get;

const handleError = (err, req, res, next) => {
  if (err.error == 'isBlank') {
    res.status(403).send({ data: err });
    return;
  }

  res.status(500).send({
    error: { msg: err }
  });
  
};

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
  if (!req.locals.data) {
    res.status(404).send({});
    return;
  }
  res.send(req.locals.data);
}

module.exports = {
  retrieveData,
  handleError,
  formatResponseMiddleware,
};
