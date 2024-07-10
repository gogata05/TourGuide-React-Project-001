import { useState, useEffect } from "react";
import styles from "./Login.module.css";

import { Link } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import { useAuthContext } from "../../contexts/AuthContext";

export const Login = () => {
  const { onLoginSubmite, serverError } = useAuthContext();

  const { values, errors, touched, onBlurHandler, onFocusHandler, changeHandler, onSubmit } = useForm(
    {
      email: "",
      password: ""
    },
    onLoginSubmite
  );

  return (
    <>
      {serverError && (
        <div>
          <div className="errorContainer">
            <p>{serverError}</p>
          </div>
        </div>
      )}

      <section className={styles["site-login"]}>
        <h3>Login</h3>
        <div className={styles.container}>
          <div className={styles["form-login"]}>
            <form method="POST" onSubmit={onSubmit}>
              <div className={styles.email}>
                <label htmlFor="email">Email</label>
                <div className={styles["email-content"]}>
                  <i className={`${styles.envelope} fa-solid fa-envelope`}></i>
                  <input type="email" name="email" id="email" placeholder="Email" value={values.email} onChange={changeHandler} onBlur={onBlurHandler} onFocus={onFocusHandler} />
                </div>
                {touched.email && errors.email && <span className={styles["login-errors"]}>{errors.email}</span>}
              </div>
              <div className={styles.password}>
                <label htmlFor="password">Password</label>
                <div className={styles["password-content"]}>
                  <i className={`${styles.lock} fa-solid fa-lock`}></i>
                  <input type="password" name="password" id="password" placeholder="Password" value={values.password} onChange={changeHandler} onBlur={onBlurHandler} onFocus={onFocusHandler} />
                </div>
                {touched.password && errors.password && <span className={styles["login-errors"]}>{errors.password}</span>}
              </div>
              <div className={styles["login-btn"]}>
                <input className={styles["login-input"]} type="submit" value="Login Now" />
              </div>
              <p>
                Don`t have an account?<Link to="/user/create-account">Create</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
