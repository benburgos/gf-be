const jwt = require('jsonwebtoken');

function genToken(data) {
  const token = jwt.sign(
    { id: data.id, bid: data.bid, rid: data.rid, ra: data.ra },
    process.env.SECRET,
    {
      expiresIn: '30m',
    }
  );
  return { token, id: data.id };
}

module.exports = {
  genToken,
};
