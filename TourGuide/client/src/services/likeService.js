import * as requester from './requester';

export const allLikes = async () => {
    try {
        const result = await requester.get('/likes/all-likes');
        return result;
    } catch (error) {
        throw error;
    }
}

export const likeUser = async (userId, likedUserId) => {
    try {
        const result = await requester.post(`/likes/like/${userId}`, { likedUserId });
        return result;
    } catch (error) {
        throw error;
    }
}

export const unlikeUser = async (userId, likedUserId) => {
    try {
        const result = await requester.post(`/likes/unlike/${userId}`, { likedUserId });
        return result;
    } catch (error) {
        throw error;
    }
}