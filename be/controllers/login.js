const Brand = require('../models/sys/brand')
const { checkHash } = require('../middlewares/checkHash');
const { genToken } = require('../services/genToken');

async function loginUser(req, res) {
  try {
    const match = await checkHash(req.body.email, req.body.password);
    console.log(match)
    const isAdmin = await Brand.findOne({adminId: match.id})
    if (isAdmin && match) {
      res.json(genToken(match, match.key));
    } else if (!isAdmin && match) {
      res.send('Use the app login page to access the app.')
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
