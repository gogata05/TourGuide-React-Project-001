const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET, SALT_ROUNDS } = require("../config/env");

exports.register = async (firstName, lastName, username, email, profilePicture, phone, password) => {
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    if (existingUser.username === username) {
      throw {
        message: "Username is already taken!"
      };
    }
    if (existingUser.email === email) {
      throw {
        message: "Email is already taken!"
      };
    }
  }

  // Използване на SALT_ROUNDS от конфигурацията
  const salt = await bcrypt.genSalt(Number(SALT_ROUNDS));
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

  const user = await User.create(userData);
  return user;
};

exports.login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw {
        message: "Invalid email or password"
      };
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw {
        message: "Invalid email or password"
      };
    }
    return user;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

exports.createToken = user => {
  const payload = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    profilePicture: user.profilePicture,
    phone: user.phone
  };
  const options = { expiresIn: "1d" };

  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET, options, (err, decodedToken) => {
      if (err) {
        return reject(err);
      }
      resolve(decodedToken);
    });
  });
};

exports.getUser = userId => User.findById(userId);
exports.editUser = async (userId, userData) => {
  return await User.updateOne({ _id: userId }, { $set: userData }, { runValidators: true });
};

exports.deleteUser = userId => User.findByIdAndDelete(userId);
