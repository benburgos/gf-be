// Write function that will check the entered password against the hashed value in DB for UserID
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Pwh = require('../models/pwh');

async function checkPassword(email, password) {
  
}

module.exports = {
    checkPassword,
}
