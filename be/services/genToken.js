const jwt = require('jsonwebtoken');

function genToken(data) {
  const token = jwt.sign(
    { id: data.id, rid: data.rid, bid: data.bid },
    process.env.SECRET,
    {
      expiresIn: '1h',
    }
  );
  return { token, data };
}

module.exports = {
  genToken,
};
