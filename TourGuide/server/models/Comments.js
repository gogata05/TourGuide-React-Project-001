const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },

    trip: {
        type: mongoose.Types.ObjectId,
        ref: 'Trip',
    },

    text: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;