const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

    likedUser: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

    status: {
        type: String,
        enumd: ['like', 'dislike'],
        default: 'like',
    },

    count: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;