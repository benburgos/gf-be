const Brand = require('../models/sys/brand')
const { checkHash } = require('../middlewares/checkHash');
const { genToken } = require('../services/genToken');

// update this function to redirect to the app/login route if they are not the company admin. If the company admin logs in on this route, redirect to the company page. 
async function loginUser(req, res) {
  try {
    const match = await checkHash(req.body.email, req.body.password);
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
