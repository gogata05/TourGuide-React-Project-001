import { useState } from "react";

export const useCreateForm = (initialValues, onSubmitHandler) => {

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
   
    const onChangeHandler = (event) => {
        setValues(state => ({ ...state, [event.target.name]: event.target.value }));
    }

    const validateCreateTripForm = () => {

        const errors = {};

        if (!values.cityOfDeparture) {
            errors.cityOfDeparture = 'City of departure is required!';
        } else if (values.cityOfDeparture.length < 3) {
            errors.cityOfDeparture = 'City of departure should be at least 3 characters!';
        } else if (values.cityOfDeparture.length > 15) {
            errors.cityOfDeparture = 'City of departure must be no more 15 characters!'
        }

        if (!values.cityOfArrival) {
            errors.cityOfArrival = 'City of arrival is required!';
        } else if (values.cityOfArrival.length < 3) {
            errors.cityOfArrival = 'City of arrival should be at least 3 characters!';
        } else if (values.cityOfArrival.length > 15) {
            errors.cityOfArrival = 'City of arrival must be no more 15 characters!';
        }

        if (!values.dateOfTrip) {
            errors.dateOfTrip = 'Date of trip is required!';
        }

        if (!values.departureTime) {
            errors.departureTime = 'Departure time is required!';
        }

        if (!values.busNumber) {
            errors.busNumber = 'BusNumber of trip is required!';
        } else if (values.busNumber < 0) {
            errors.busNumber = 'BusNumber of trip must be a non-negative number!';
        }
        
        if (!values.description) {
            errors.description = 'Description is required!';
        } else if (values.description.length > 15) {
            errors.description = 'Description of departure must be no more 15 characters!'
        }

        if (!values.tripImg) {
            errors.tripImg = 'Trip Image is required!';
        } else if (!/^https?:\/\//.test(values.tripImg)) {
            errors.tripImg = 'Trip Image is required and should start with http:// or https://!';
        }

        if (!values.nights) {
            errors.nights = 'Nights of trip is required!';
        } else if (values.nights < 0) {
            errors.nights = 'Nights of trip must be a non-negative number!';
        }

        if (!values.priceOfTrip) {
            errors.priceOfTrip = 'Price of trip is required!';
        } else if (values.priceOfTrip < 0) {
            errors.priceOfTrip = 'Price of trip must be a non-negative number!';
        }

        if (!values.luggageSpace) {
            errors.luggageSpace = 'LuggageSpace is required!';
        }
        else if (values.luggageSpace < 0) {
            errors.luggageSpace = 'LuggageSpace of trip must be a non-negative number!';
        }

        if (!values.currency) {
            errors.currency = 'Currency is required!';
        }

        if (!values.wiFi) {
            errors.wiFi = 'Currency is required!';
        }

        if (!values.food) {
            errors.food = 'Currency is required!';
        }


        if (!values.powerOutlets) {
            errors.powerOutlets = 'Currency is required!';
        }

        if (!values.drinks) {
            errors.drinks = 'Currency is required!';
        }

        if (!values.legRoom) {
            errors.legRoom = 'Currency is required!';
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    }

    const onBlurHandler = (event) => {

        setTouched(state => ({ ...state, [event.target.name]: true }));

        validateCreateTripForm();
    }

    const onFocusHandler = (event) => {

        setTouched(state => ({ ...state, [event.target.name]: false }));
        setErrors(state => ({ ...state, [event.target.name]: '' }));

    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (validateCreateTripForm()) {
            onSubmitHandler(values);
        }
    }

    const changeValues = (newValues) => {
        setValues(newValues);
    }

    return {
        values,
        errors,
        touched,
        onChangeHandler,
        onSubmit,
        changeValues,
        onBlurHandler,
        onFocusHandler,
    }
}