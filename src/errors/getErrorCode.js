const { errorType } = require('./index');

const getErrorCode = errorName => {
  return errorType[errorName]
}

module.exports = getErrorCode