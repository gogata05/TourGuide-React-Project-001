import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";

export const useForm = (initialValues, onSubmitHandler) => {
  const [values, setValues] = useState(initialValues);
  const [editProfileValues, setEditProfileValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const changeHandler = event => {
    setValues(state => ({ ...state, [event.target.name]: event.target.value }));
    setEditProfileValues(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const validateLoginForm = () => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9.,!-_]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 3) {
      errors.password = "Password should be at least 3 characters!";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const validateCreateForm = () => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = "First Name is required";
    } else if (values.firstName.length < 3 || values.firstName > 15) {
      errors.firstName = "First Name must be between 3 and 15 characters!";
    }

    if (!values.lastName) {
      errors.lastName = "Last Name is required";
    } else if (values.lastName.length < 3 || values.lastName > 15) {
      errors.lastName = "Last Name must be between 3 and 15 characters!";
    }

    if (!values.username) {
      errors.username = "Username is required";
    } else if (values.username.length < 3 || values.username > 15) {
      errors.username = "Username must be between 3 and 15 characters!";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9.,!-_]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.profilePicture) {
      errors.profilePicture = "Profile Picture is required";
    } else if (!/^https?:\/\//.test(values.profilePicture)) {
      errors.profilePicture = "The photo image is required and should start with http:// or https://!";
    }

    if (!values.phone) {
      errors.phone = "Phone is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 3) {
      errors.password = "Password should be at least 3 charachters!";
    }

    if (!values.rePassword) {
      errors.rePassword = "Confirm Password is required";
    } else if (values.rePassword.length < 3) {
      errors.rePassword = "Confirm Password should be at least 3 charachters!";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const onBlurHandler = event => {
    setTouched(state => ({ ...state, [event.target.name]: true }));

    validateLoginForm();
    validateCreateForm();
  };

  const onFocusHandler = event => {
    setTouched(state => ({ ...state, [event.target.name]: false }));
    setErrors(prevErrors => ({ ...prevErrors, [event.target.name]: "" }));
  };

  const onSubmit = event => {
    event.preventDefault();

    if (validateLoginForm()) {
      onSubmitHandler(values);
    } else if (validateCreateForm()) {
      onSubmitHandler(values);
    } else {
      onSubmitHandler(values);
    }
  };

  const changeValues = newValues => {
    setValues(newValues);
    setEditProfileValues(newValues);
  };

  return {
    values,
    errors,
    touched,
    onBlurHandler,
    onFocusHandler,
    changeHandler,
    onSubmit,
    changeValues
  };
};
