const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../config/env');

exports.register = async (firstName, lastName, username, email, profilePicture, phone, password) => {

    // const existingUser = await User.findOne({ $or: [{ username }, { email }] }); //Проверявам дали има съществуваш потребител с този username или email;

    // if (existingUser.username === username) {
    //     throw {
    //         message: 'Username is already taken!'
    //     }
    // }

    // if (existingUser.email === email) {
    //     throw {
    //         message: 'Email is already taken!'
    //     }
    // }

    const userData = {
        firstName,
        lastName,
        username,
        email,
        profilePicture,
        phone,
        password
    };

    return User.create(userData);
}

exports.login = async (email, password) => {

    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw {
                message: 'Invalid email or password'
            }
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw {
                message: 'Invalid email or password'
            }
        }
        return user;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}

exports.createToken = (user) => {

    const payload = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        phone: user.phone
    };
    const option = { expiresIn: '1d' };

    const tokenPromise = new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, option, (err, decodedToken) => {
            if (err) {
                return reject(err);
            }
            resolve(decodedToken);
        });
    });
    return tokenPromise;
}

// exports.getUser = (userId) => User.findOne({ _id: userId }, { password: 0, __v: 0 }); 
exports.getUser = (userId) => User.findById(userId);
exports.editUser = async (userId, userData) => {

    // const existingUserWithUsername = await User.findOne({ username: userData.username });

    // if (existingUserWithUsername && existingUserWithUsername._id.toString() !== userId) {
    //     throw {
    //         message: 'A user with this username already exists!'
    //     }
    // }

    // const existingUserWithEmail = await User.findOne({ email: userData.email });

    // if (existingUserWithEmail && existingUserWithEmail._id.toString() !== userId) {
    //     throw {
    //         message: 'A user with this email already exists!'
    //     }
    // }

    return await User.updateOne({ _id: userId }, { $set: userData }, { runValidators: true });
    // return await User.findByIdAndUpdate(userId, { $set: userData }, { new: true, runValidators: true });
}

exports.deleteUser = (userId) => User.findByIdAndDelete(userId);