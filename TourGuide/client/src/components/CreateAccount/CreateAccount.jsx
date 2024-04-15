import React from "react";
import styles from './CreateAccount.module.css';

import { Link } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";

export const CreateAccount = () => {

    const { onRegisterSubmit, serverError } = useAuthContext();
    const { values, errors, touched, changeHandler, onFocusHandler, onBlurHandler, onSubmit } = useForm({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        profilePicture: '',
        phone: '',
        password: '',
        rePassword: '',
    }, onRegisterSubmit);
    
    return (

        <>
            {serverError && (
                <div>
                    <div className="errorContainer">
                        <p>{serverError}</p>
                    </div>
                </div>
            )}

            <section className={styles['site-create-account']}>
                <h3>Create Account</h3>
                <div className={styles.container}>
                    <form method="POST" onSubmit={onSubmit}>
                        <div className={styles['form-group']}>
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
                                {touched.firstName && errors.firstName && <span className={styles['create-account-errors']}>{errors.firstName}</span>}
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
                                {touched.username && errors.username && <span className={styles['create-account-errors']}>{errors.username}</span>}
                            </div>
                        </div>
                        <div className={styles['form-group']}>
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
                                {touched.lastName && errors.lastName && <span className={styles['create-account-errors']}>{errors.lastName}</span>}
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
                                {touched.email && errors.email && <span className={styles['create-account-errors']}>{errors.email}</span>}
                            </div>
                        </div>
                        <div className={styles['form-group']}>
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
                                {touched.profilePicture && errors.profilePicture && <span className={styles['create-account-errors']}>{errors.profilePicture}</span>}
                            </div>
                            <div className={styles['form-row']}>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="******"
                                    value={values.password}
                                    onChange={changeHandler}
                                    onBlur={onBlurHandler}
                                    onFocus={onFocusHandler}
                                />
                                {touched.password && errors.password && <span className={styles['create-account-errors']}>{errors.password}</span>}
                            </div>
                        </div>
                        <div className={styles['form-group']}>
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
                                {touched.phone && errors.phone && <span className={styles['create-account-errors']}>{errors.phone}</span>}
                            </div>
                            <div className={styles['form-row']}>
                                <label htmlFor="rePassword">Confirm Password</label>
                                <input
                                    type="password"
                                    id="rePassword"
                                    name="rePassword"
                                    placeholder="******"
                                    value={values.rePassword}
                                    onChange={changeHandler}
                                    onBlur={onBlurHandler}
                                    onFocus={onFocusHandler}
                                />
                                {touched.rePassword && errors.rePassword && <span className={styles['create-account-errors']}>{errors.rePassword}</span>}
                            </div>
                        </div>
                        <div className={styles['create-account-btn']}>
                            <input type="submit" value="Create Account" />
                            <p>Already have an account<Link to="/user/login">Login</Link></p>
                        </div>
                    </form>

                </div>
            </section>
        </>
    )
}