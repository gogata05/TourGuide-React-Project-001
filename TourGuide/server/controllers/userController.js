const router = require('express').Router();
const userServices = require('../services/userServices');
const { COOKIE_SESSION_NAME } = require('../constants');
const { getErrorMessage } = require('../utils/errorHelper');

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, username, email, profilePicture, phone, password } = req.body;
    const user = await userServices.register(firstName, lastName, username, email, profilePicture, phone, password);
    const token = await userServices.createToken(user);

    res.cookie(COOKIE_SESSION_NAME, token, { httpOnly: true });
    res.json({
      authToken: token,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      phone: user.phone,
      _id: user._id
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userServices.login(email, password);
    const token = await userServices.createToken(user);

    res.cookie(COOKIE_SESSION_NAME, token, { httpOnly: true });
    res.json({
      authToken: token,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      phone: user.phone,
      _id: user._id
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userServices.getUser(userId);

    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      phone: user.phone,
      _id: user._id
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/edit/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { firstName, lastName, username, email, profilePicture, phone } = req.body;

    const updateUserData = { firstName, lastName, username, email, profilePicture, phone };

    const editUser = await userServices.editUser(userId, updateUserData);

    res.status(200).json(editUser);
  } catch (error) {
    res.status(400).json({
      message: getErrorMessage(error)
    });
  }
});

router.delete('/delete/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    await userServices.deleteUser(userId);

    res.clearCookie(COOKIE_SESSION_NAME);
    res.status(200).end();
  } catch (error) {
    res.status(400).json({
      message: getErrorMessage(error)
    });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie(COOKIE_SESSION_NAME);
  res.status(200).json({});
});

module.exports = router;
