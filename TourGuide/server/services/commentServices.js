const Comment = require('../models/Comments');

exports.getAllComments = async (tripId) => await Comment.find({ trip: tripId }).populate('user');

exports.addComment = async (userId, tripId, text) => await Comment.create({ user: userId, trip: tripId, text });

exports.editComment = async (commentId, userId, newText) => {

    const comment = await Comment.findById(commentId);
    console.log(comment)
    if (comment.user.toString() !== userId) {  
        throw new Error('You do not have permission to edit this comment GM.');
    }

    await Comment.updateOne({ _id: commentId }, { $set: { text: newText } }, { runValidators: true });
}

exports.deleteComment = async (commentId) => Comment.findByIdAndDelete(commentId);