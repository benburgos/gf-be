const mongoose = require('mongoose');

// Database Connection
mongoose.connect(process.env.DATABASE_URL);

// DB Connection Events
const db = mongoose.connection;
db.on('error', (err) => console.log('Error:' + err.message));
db.on('connected', () => console.log('Connected to database.'));
db.on('disconnected', () => console.log('Disconnected from database.'));

module.exports = {
  db,
};
