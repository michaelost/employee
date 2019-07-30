const handleError = (err, req, res, next) => {
  if (err.error == 'isBlank') {
    res.status(403).send({ data: err });
  }
};

module.exports = {
  handleError,
};
