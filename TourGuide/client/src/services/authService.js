import * as requester from './requester';

export const login = async (userData) => {

    try {
        const result = await requester.post('/users/login', userData);
        return result;
    } catch (error) {
        throw error;
    }
}

export const register = async (userData) => {

    try {
        const result = await requester.post('/users/register', userData);
        return result;
    } catch (error) {
        throw error;
    }
}

export const getUser = async (userId) => {

    try {
        const result = await requester.get(`/users/user/${userId}`);
        return result;
    } catch (error) {
        console.log('Error in getUser GM:', error);
        throw error;
    }
}

export const editProfile = async (userId, userData) => {

    try {

        await requester.put(`/users/edit/${userId}`, userData);

        const editUser = await requester.get(`/users/user/${userId}`)
        return editUser;
    } catch (error) {
        throw error;
    }
}

export const deleteProfile = async (userId) => {

    try {
        await requester.del(`/users/delete/${userId}`);
    } catch (error) {
        throw error;
    }
}

export const logout = async () => {
    await requester.get('/users/logout');
}