import { Link } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Profile.module.css';

import { useAuthContext } from '../../contexts/AuthContext';
import * as authService from '../../services/authService';
import { Loading } from "../Loading";
import { DeleteModal } from '../DeleteModal';

export const Profile = () => {

    const { userId, onLogout } = useAuthContext();
    const [profile, setProfile] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
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

    const handleDelete = () => {
        setIsDeleteModal(true);
    }

    const handleCancelDelete = () => {
        setIsDeleteModal(false);
    }

    const confirmDeleteProfile = () => {
        authService.deleteProfile(userId);
        setIsDeleteModal(false);
        onLogout();
        navigate('/user/login');
    }

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
                            <Link onClick={handleDelete}><i className="fa-solid fa-trash"></i>Delete</Link>
                            {/* <button className={styles['profile-delete-btn']} onClick={handleDelete}><i className="fa-solid fa-trash"></i>Delete</button> */}
                        </div>
                    </div>
                </section>
            }
            {isDeleteModal
                ? <DeleteModal isConfirm={confirmDeleteProfile} isCancel={handleCancelDelete} />
                : null
            }

        </>
    )
}