const User = require('../../models/user');
const Pwh = require('../../models/pwh');
const { hashPassword } = require('../../middlewares/genHash');

async function createUser(userData, plainPassword) {
  try {
    // Hash the password
    const hashedPassword = await hashPassword(plainPassword);

    // Create user document
    const user = await User.create(userData);

    // Create Pwh document for storing hashed password
    const pwh = await Pwh.create({
      _id: user._id, // Use the user ID as the Pwh document ID
      userId: user._id,
      pwh: hashedPassword,
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    });

    return user; // Return user document
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

module.exports = {
  createUser,
};
