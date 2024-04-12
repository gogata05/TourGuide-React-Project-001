import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { useLocaleStorage } from "../hooks/useLocaleStorage";
import * as authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {

    const [auth, setAuth] = useLocaleStorage('userData', {});

    const [serverError, setServerError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setServerError('');
        }, 2000);
    }, [serverError]);

    const onLoginSubmite = async (userData) => {

        try {

            const user = await authService.login(userData);

            setAuth(user);

            navigate('/all-trips');

        } catch (error) {
            setServerError(error.message);
        }
    }

    const onRegisterSubmit = async (userData) => {
     
        const { rePassword, ...registerData } = userData;

        if (rePassword !== registerData.password) {

            return setServerError('Password must match');

        }

        try {

            const newUser = await authService.register(userData);

            setAuth(newUser);

            navigate('/all-trips');

        } catch (error) {
            setServerError(error.message);
        }
    }

    const onEditProfileSubmit = async (userData) => {
       
        try {

            const editProfile = await authService.editProfile(userData._id, userData);

            const updateProfileWithToken = {...editProfile, authToken: auth.authToken}

            setAuth(updateProfileWithToken);

            navigate(`/user/profile/${userData._id}`);

        } catch (error) {
            setServerError(error.message);
        }
    }

    const onLogout = async () => {

        await authService.logout();

        setAuth({});
    }

    const context = {
        onLoginSubmite,
        onRegisterSubmit,
        onEditProfileSubmit,
        onLogout,
        firstName: auth.firstName,
        lastName: auth.lastName,
        username: auth.username,
        email: auth.email,
        phone: auth.phone,
        profilePicture: auth.profilePicture,
        token: auth.authToken,
        userId: auth._id,
        isAuthenticated: !!auth.authToken,
        serverError,
    }

    return (
        <>
            <AuthContext.Provider value={context}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export const useAuthContext = () => {

    const context = useContext(AuthContext);
    return context;
}