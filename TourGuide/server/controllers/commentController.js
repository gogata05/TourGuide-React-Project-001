const router = require('express').Router();

const commentService = require('../services/commentServices');

router.get('/get-comments/:tripId', async (req, res) => {

    const tripId = req.params.tripId;
    try {
        const comments = await commentService.getAllComments(tripId);

        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/add-comment', async (req, res) => {

    const { userId, tripId, text } = req.body;
    try {
        await commentService.addComment(userId, tripId, text);
        res.status(201).json({ message: 'Comment added successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error GM' })
    }
});

router.put('/edit-comment/:commentId', async (req, res) => {

    const commentId = req.params.commentId;
    const { userId } = req.body;
    const editText = req.body.text;
    try {
        await commentService.editComment(commentId, userId, editText);
        res.status(200).json({ message: 'Comment edited successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal service error GM' });
    }
});

router.delete('/delete-comment/:commentId', async (req, res) => {

    const commentId = req.params.commentId;
    try {
        await commentService.deleteComment(commentId);;
        res.status(204).json({ message: 'Comment deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error GM' });
    }
});

module.exports = router;