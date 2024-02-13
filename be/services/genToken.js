const jwt = require('jsonwebtoken');

function genToken(data) {
  const token = jwt.sign({ id: data.id }, process.env.SECRET, {
    expiresIn: '1h',
  });
  return { token, data };
}

module.exports = {
  genToken,
};
