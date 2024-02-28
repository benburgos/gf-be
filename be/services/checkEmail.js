const User = require('../models/user');

async function checkEmail(data) {
  const existing = await User.findOne({ email: data }).collation({
    locale: 'en',
    strength: 1,
  });

  return existing ? true : false;
}

module.exports = {
  checkEmail,
};
