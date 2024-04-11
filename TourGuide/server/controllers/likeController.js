const router = require('express').Router();

const likeServices = require('../services/likeService');
const userServices = require('../services/userServices');
const { getErrorMessage } = require('../utils/errorHelper');
const Like = require('../models/Like');

router.get('/all-likes', async (req, res) => {

    try {
        const allLikes = await likeServices.allLikes();
        res.status(200).json(allLikes);
    } catch (error) {
        res.status(400).json({
            message: getErrorMessage(error)
        });
    }
});

router.post('/like/:userId', async (req, res) => {

    try {
        const userId = req.params.userId;
        const likedUserId = req.body.likedUserId;
        const likedUser = await userServices.getUser(likedUserId);

        if (!likedUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        const like = await likeServices.likeUser(userId, likedUserId)

        res.json(like);
    } catch (error) {
        console.error('Error while liking the post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/unlike/:userId', async (req, res) => {

    try {
        const userId = req.params.userId;
        const likedUserId = req.body.likedUserId;
        const like = await likeServices.removeLike(userId, likedUserId);

        if (!like) {
            return res.status(404).json({ error: 'Like not found' });
        }

        res.json(like);
    } catch (error) {
        console.error('Error while unliking the post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;


// if (!likedUser.likes.includes(userId)) {
//     likedUser.likes.push(userId);
//     await likedUser.save();
// }

// if (likedUser.likes.includes(userId)) {
//     return res.status(400).json({ error: 'User already liked this profile' })
// }

// likedUser.likes.push(userId);
// await likedUser.save();