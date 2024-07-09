const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/env');

exports.register = async (firstName, lastName, username, email, profilePicture, phone, password) => {
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    if (existingUser.username === username) {
      throw {
        message: 'Username is already taken!'
      };
    }

    if (existingUser.email === email) {
      throw {
        message: 'Email is already taken!'
      };
    }
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userData = {
    firstName,
    lastName,
    username,
    email,
    profilePicture,
    phone,
    password: hashedPassword
  };

  return User.create(userData);
};
