import { Link } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Profile.module.css';

import { useAuthContext } from '../../contexts/AuthContext';
import * as authService from '../../services/authService';
import { Loading } from "../Loading";

export const Profile = () => {

    const { userId, onLogout } = useAuthContext();
    const [profile, setProfile] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        authService.getUser(userId)
            .then(userData => {
                setProfile(userData);
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err);
            })
    }, [userId]);

    return (
        <>
            {isLoading
                ? < Loading />
                : <section className={styles.profile}>
                    <h3>Profile</h3>
                    <div className={styles.container}>
                        <div className={styles['profile-wrapper']}>
                            <div className={styles['profile-media']}>
                                <img src={profile.profilePicture} alt="profile-picture" />
                            </div>
                            <div className={styles['profile-content']}>
                                <ul>
                                    <li><span>First Name:</span>{profile.firstName}</li>
                                    <li><span>Last Name:</span>{profile.lastName}</li>
                                    <li><span>Username:</span>{profile.username}</li>
                                    <li><span>Email:</span>{profile.email}</li>
                                    <li><span>Phone:</span>{profile.phone}</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles['profile-btn']}>
                            <Link to={`/user/edit-profile/${profile._id}`}><i className="fa-solid fa-square-pen"></i>Edit</Link>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}