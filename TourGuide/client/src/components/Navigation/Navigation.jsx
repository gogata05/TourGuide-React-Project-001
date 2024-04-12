import { Link } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";

import React from "react";
import styles from './Navigation.module.css';

export const Navigation = () => {

    const { isAuthenticated, username, userId } = useContext(AuthContext);
    
    return (
        <header className={styles['site-header']}>

            {/* <div>
                <div className="errorContainer">
                    <p>App don`t work</p>
                </div>
            </div> */}

            <div className={styles.container}>
                <div className={styles.logo}>
                    <p className={styles['logo-content']}>Tour Guide</p>
                </div>
                <nav className={styles['site-nav']}>
                    <ul>
                        <li><Link to="/"><i className="fa-solid fa-house-user"></i>Home</Link></li>
                        <li><a href="#"><i className="fa-solid fa-suitcase"></i>Trips</a>
                            <div className={styles['sub-menu']}>
                                <ul>
                                    <li><Link to="/all-trips"><i className="fa-solid fa-suitcase"></i>All Trips</Link></li>
                                    {isAuthenticated && (
                                        <>
                                            <li><Link to="/trip/create-trip"><i className="fa-solid fa-suitcase"></i>Create Trip</Link></li>
                                            <li><Link to="/trip/my-trips"><i className="fa-solid fa-suitcase"></i>My Trips</Link></li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </li>
                        {!isAuthenticated && (
                            <>
                                <li><Link to="/user/create-account"><i className="fa-solid fa-arrow-right-to-bracket"></i>Create Account</Link></li>
                                <li><Link to="/user/login"><i className="fa-solid fa-arrow-right-to-bracket"></i>Login</Link></li>
                            </>
                        )}
                        {isAuthenticated && (
                            <>
                                <li><Link to={`/user/profile/${userId}`}><i className="fa-solid fa-user"></i>Profile: <span>{username}</span></Link></li>
                                <li><Link to="/user/logout"><i className="fa-solid fa-arrow-right-from-bracket"></i>Logout</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}