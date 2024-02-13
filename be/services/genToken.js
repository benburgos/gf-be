const jwt = require('jsonwebtoken');

function genToken(data, secret) {
  const token = jwt.sign({ id: data.id }, secret, {
    expiresIn: '1h',
  });
  return token;
}

module.exports = {
  genToken,
};
