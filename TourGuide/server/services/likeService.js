const Like = require('../models/Like');

exports.allLikes = () => Like.find();

exports.getLike = (userId, likedUserId) => Like.findOne({ user: userId, likedUser: likedUserId });

exports.removeLike = (userId, likedUserId) => Like.deleteOne({ user: userId, likedUser: likedUserId });

exports.likeUser = async (userId, likedUserId) => {
    try {
        let like = await Like.findOneAndUpdate(
            { user: userId, likedUser: likedUserId },
            { $inc: { count: 1 }, status: 'like' },
            { upsert: true, new: true }
        )
        return like
    } catch (error) {
        throw error;
    }
}

exports.unlikeUser = async (userId, likedUserId) => {
    try {
        let like = await Like.findOneAndUpdate(
            { user: userId, likedUser: likedUserId },
            { $inc: { count: -1 }, status: 'dislike' },
            { upsert: true, new: true }
        )
        return like
    } catch (error) {
        throw error;
    }
}