var omitSpace = (str) => {
  return str.trim().replace(/\s\s+/g, ' ');
}

var isRealString = (str) => {
  return typeof str === 'string' && str.trim().length > 0;
};

module.exports = {isRealString, omitSpace};
