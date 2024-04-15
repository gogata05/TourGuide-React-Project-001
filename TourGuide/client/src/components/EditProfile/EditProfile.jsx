import React, { useEffect, useState } from "react";
import styles from './EditProfile.module.css';

import { useForm } from "../../hooks/useForm";
import { useAuthContext } from '../../contexts/AuthContext';
import * as authService from '../../services/authService';
import { useParams } from "react-router-dom";
import { Loading } from "../Loading";

export const EditProfile = () => {

    const { userId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const { firstName, lastName, username, email, phone, profilePicture, onEditProfileSubmit } = useAuthContext();
    const { values, errors, touched, changeHandler, onBlurHandler, onFocusHandler, changeValues, onSubmit } = useForm({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        phone: phone,
        profilePicture: profilePicture,
    }, onEditProfileSubmit);

    useEffect(() => {
        authService.getUser(userId)
            .then(userData => {
                changeValues(userData);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(`GM ${err}`)
            })
    }, [userId]);


    return (
        <>
            {isLoading
                ? <Loading />
                : <section className={styles['site-edit-account']}>
                    <h3>Edit Account</h3>
                    <div className={styles.container}>
                        <form method="PUT" onSubmit={onSubmit}>
                            <div className={styles['form-group-edit']}>
                                <div className={styles['form-row']}>
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        placeholder="Ivan"
                                        value={values.firstName}
                                        onChange={changeHandler}
                                        onBlur={onBlurHandler}
                                        onFocus={onFocusHandler}
                                    />
                                    {touched.firstName && errors.firstName && <span className={styles['edit-profile-errors']}>{errors.firstName}</span>}
                                </div>
                                <div className={styles['form-row']}>
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Ivan0000"
                                        value={values.username}
                                        onChange={changeHandler}
                                        onBlur={onBlurHandler}
                                        onFocus={onFocusHandler}
                                    />
                                    {touched.username && errors.username && <span className={styles['edit-profile-errors']}>{errors.username}</span>}
                                </div>
                            </div>
                            <div className={styles['form-group-edit']}>
                                <div className={styles['form-row']}>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Ivanov"
                                        value={values.lastName}
                                        onChange={changeHandler}
                                        onBlur={onBlurHandler}
                                        onFocus={onFocusHandler}
                                    />
                                    {touched.lastName && errors.lastName && <span className={styles['edit-profile-errors']}>{errors.lastName}</span>}
                                </div>
                                <div className={styles['form-row']}>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="Ivan@abv.bg"
                                        value={values.email}
                                        onChange={changeHandler}
                                        onBlur={onBlurHandler}
                                        onFocus={onFocusHandler}
                                    />
                                    {touched.email && errors.email && <span className={styles['edit-profile-errors']}>{errors.email}</span>}
                                </div>
                            </div>
                            <div className={styles['form-group-edit']}>
                                <div className={styles['form-row']}>
                                    <label htmlFor="profilePicture">Profile picture Url</label>
                                    <input
                                        type="text"
                                        id="profilePicture"
                                        name="profilePicture"
                                        placeholder="https://..."
                                        value={values.profilePicture}
                                        onChange={changeHandler}
                                        onBlur={onBlurHandler}
                                        onFocus={onFocusHandler}
                                    />
                                    {touched.profilePicture && errors.profilePicture && <span className={styles['edit-profile-errors']}>{errors.profilePicture}</span>}
                                </div>
                            </div>
                            <div className={styles['form-group-edit']}>
                                <div className={styles['form-row']}>
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        placeholder="0888123456"
                                        value={values.phone}
                                        onChange={changeHandler}
                                        onBlur={onBlurHandler}
                                        onFocus={onFocusHandler}
                                    />
                                    {touched.phone && errors.phone && <span className={styles['edit-profile-errors']}>{errors.phone}</span>}
                                </div>
                            </div>
                            <div className={styles['edit-btn-trip']}>
                                <input type="submit" value="Save" />
                            </div>
                        </form>
                    </div>
                </section>
            }
        </>
    )
}