const { checkHash } = require('../../middlewares/checkHash');
const { genToken } = require('../../services/genToken');

async function loginAppUser(req, res) {
  try {
    const match = await checkHash(req.body.email, req.body.password);
    if (match) {
      res.json(genToken(match, match.key));
    } else {
      res.send('Incorrect Password.');
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  loginAppUser,
};
