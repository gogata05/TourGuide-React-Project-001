import * as requester from '../services/requester';

export const addComment = async (userId, tripId, text) => {

    try {
        await requester.post(`/comments/add-comment`, { userId, tripId, text });
    } catch (error) {
        console.error('Error adding comment GM:', error);
        throw error;
    }
}

export const getComments = async (tripId) => {

    try {
        const result = await requester.get(`/comments/get-comments/${tripId}`);
        return result;
    } catch (error) {
        console.error('Error fetching comments GM:', error);
        throw error;
    }
}

export const editComment = async (commentId, userId, text) => {
    
    try {
        const result = await requester.put(`/comments/edit-comment/${commentId}`, { userId, text });
        return result;
    } catch (error) {
        console.error('Error fetching comments GM:', error);
        throw error;
    }
}

export const deleteComment = async (commentId) => {

    try {
        await requester.del(`/comments/delete-comment/${commentId}`);
    } catch (error) {
        console.log('Error deleting comment GM', error);
        throw error;
    }
}