const { checkHash } = require('../middlewares/checkHash');
const { genToken } = require('../services/genToken');

async function loginUser(req, res) {
  try {
    const match = await checkHash(req.body.email, req.body.password);
    if (match.isMatch) {
      genToken(match, match.key);
      res.send('Successful Login.');
    } else {
      res.send('Incorrect Password.');
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  loginUser,
};
