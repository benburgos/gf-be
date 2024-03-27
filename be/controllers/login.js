const { checkHash } = require('../middlewares/checkHash');
const { genToken } = require('../services/genToken');

// update this function to redirect to the app/login route if they are not the company admin. If the company admin logs in on this route, redirect to the company page. 
async function loginUser(req, res) {
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
  loginUser,
};
