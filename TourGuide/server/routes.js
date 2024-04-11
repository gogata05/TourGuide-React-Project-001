const router = require('express').Router();

const userController = require('./controllers/userController');
const tripController = require('./controllers/tripController');
const likeController = require('./controllers/likeController');
const commentController = require('./controllers/commentController');

router.use('/users', userController);
router.use('/trips', tripController);
router.use('/likes', likeController);
router.use('/comments', commentController);

module.exports = router;