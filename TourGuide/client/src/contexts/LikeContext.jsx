import { createContext, useContext, useState } from 'react';


const LikedStatusContext = createContext();

export const LikedStatusProvider = ({ children }) => {

    const [likedStatus, setLikedStatus] = useState({ likes: [] });

    const updateLikedStatus = newLikedStatus => {
        setLikedStatus(newLikedStatus);
    };

    return (
        <LikedStatusContext.Provider value={{ likedStatus, updateLikedStatus }}>
            {children}
        </LikedStatusContext.Provider>
    )
}

export const useLikedStatus = () => {
    return useContext(LikedStatusContext)
}