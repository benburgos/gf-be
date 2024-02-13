const jwt = require('jsonwebtoken');

function authToken(req, res, next) {
  const token = req.header('Authorization').split(' ')[1];
  if (!token) return res.status(401).json({ Error: 'Access Denied' });
  try {
    const decoded = jwt.verify(token, process.env.SECRET)
    next()
  } catch (error) {
    res.status(401).json({ Error: 'Invalid Token' });
  }
}

module.exports = {
  authToken,
};
