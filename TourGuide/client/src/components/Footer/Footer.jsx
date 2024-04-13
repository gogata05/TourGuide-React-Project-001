import React from "react";
import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles['site-footer']}>
            <div className={styles.container}>
                <div className={styles['contacts-footer']}>
                    <ul>
                        <li>Copyright &copy; By Georgi Markov</li>
                    </ul>
                </div>
                <div className={styles['footer-icons']}>
                    <ul>
                        <li><a href="https://www.facebook.com/"><i className="fa-brands fa-facebook"></i></a><span>Facebook</span></li>
                        <li><a href="https://github.com/gogata05"><i className="fa-brands fa-github"></i></a><span>Github</span></li>
                        <li><a href="https://www.linkedin.com/in/georgi-markov-57b5b224b/"><i className="fa-brands fa-linkedin"></i></a><span>Linkedin</span></li>
                        <li><a href="https://twitter.com/"><i className="fab fa-twitter"></i></a><span>X</span></li>
                    </ul>
                </div>
            </div>
        </footer>

    )
}