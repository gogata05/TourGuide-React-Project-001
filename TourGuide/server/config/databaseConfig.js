const mongoose = require('mongoose');
const { DB_CONNECTION_URL } = require('./env');

exports.initDB = () => {
  mongoose.connection.on('open', () => console.log('Database is connected!'));
  mongoose.connection.on('error', err => console.error('Database connection error:', err));
  mongoose.connect(DB_CONNECTION_URL).catch(err => console.error('Failed to connect to MongoDB', err));
};
