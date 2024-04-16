import React from "react";
import styles from './CreateTrip.module.css';

import { useTripContext } from "../../contexts/TripContext";
import { useCreateForm } from "../../hooks/useCreateForm";


export const CreateTrip = () => {

    const { onCreateTripSubmit, serverError } = useTripContext();
    const { values, errors, touched, onChangeHandler, onBlurHandler, onFocusHandler, onSubmit } = useCreateForm({
        cityOfDeparture: '',
        cityOfArrival: '',
        dateOfTrip: '',
        departureTime: '',
        busNumber: '',
        description: '',
        tripImg: '',
        nights: '',
        priceOfTrip: '',
        currency: '',
        wiFi: '',
        food: '',
        luggageSpace: '',
        powerOutlets: '',
        drinks: '',
        legRoom: '',
    }, onCreateTripSubmit);

    return (

        <>
            {serverError && (
                <div>
                    <div className="errorContainer">
                        <p>{serverError}</p>
                    </div>
                </div>
            )}

            <section className={styles['create-trip']}>
                <h3>Create Trip</h3>
                <div className={styles.container}>
                    <form method="POST" onSubmit={onSubmit}>
                        <div className={styles['form-group']}>
                            <div className={styles['form-row']}>
                                <label htmlFor="cityOfDeparture">City of departure</label>
                                <input
                                    type="text"
                                    name="cityOfDeparture"
                                    id="cityOfDeparture"
                                    placeholder="Sofia"
                                    value={values.cityOfDeparture}
                                    onChange={onChangeHandler}
                                    onBlur={onBlurHandler}
                                    onFocus={onFocusHandler}
                                />
                                {touched.cityOfDeparture && errors.cityOfDeparture && <span className={styles['create-trip-errors']}>{errors.cityOfDeparture}</span>}
                            </div>
                            <div className={styles['form-row']}>
                                <label htmlFor="dateOfTrip">Date of trip</label>
                                <input
                                    type="date"
                                    id="dateOfTrip"
                                    name="dateOfTrip"
                                    value={values.dateOfTrip}
                                    onChange={onChangeHandler}
                                    onBlur={onBlurHandler}
                                    onFocus={onFocusHandler}
                                />
                                {touched.dateOfTrip && errors.dateOfTrip && <span className={styles['create-trip-errors']}>{errors.dateOfTrip}</span>}
                            </div>
                        </div>
                        <div className={styles['form-group']}>
                            <div className={styles['form-row']}>
                                <label htmlFor="cityOfArrival">City of arrival</label>
                                <input
                                    type="text"
                                    id="cityOfArrival"
                                    name="cityOfArrival"
                                    placeholder="Ohrid"
                                    value={values.cityOfArrival}
                                    onChange={onChangeHandler}
                                    onBlur={onBlurHandler}
                                    onFocus={onFocusHandler}
                                />
                                {touched.cityOfArrival && errors.cityOfArrival && <span className={styles['create-trip-errors']}>{errors.cityOfArrival}</span>}
                            </div>
                            <div className={styles['form-row']}>
                                <label htmlFor="departureTime">Departure Time</label>
                                <select
                                    name="departureTime"
                                    id="departureTime"
                                    value={values.departureTime}
                                    onChange={onChangeHandler}
                                    onBlur={onBlurHandler}
                                    onFocus={onFocusHandler}
                                >
                                    <option value="00:00">00:00</option>
                                    <option value="00:15">00:15</option>
                                    <option value="00:30">00:30</option>
                                    <option value="00:45">00:45</option>
                                    <option value="01:00">01:00</option>
                                    <option value="01:00">01:00</option>
                                    <option value="01:15">01:15</option>
                                    <option value="01:30">01:30</option>
                                    <option value="01:45">01:45</option>
                                    <option value="02:00">02:00</option>
                                    <option value="02:15">02:15</option>
                                    <option value="02:40">02:40</option>
                                    <option value="02:45">02:45</option>
                                    <option value="03:00">03:00</option>
                                    <option value="03:15">03:15</option>
                                    <option value="03:30">03:30</option>
                                    <option value="03:45">03:45</option>
                                    <option value="04:00">04:00</option>
                                    <option value="04:15">04:15</option>
                                    <option value="04:30">04:30</option>
                                    <option value="04:45">04:45</option>
                                    <option value="05:00">05:00</option>
                                    <option value="05:15">05:15</option>
                                    <option value="05:30">05:30</option>
                                    <option value="05:45">05:45</option>
                                    <option value="06:00">06:00</option>
                                    <option value="06:15">06:15</option>
                                    <option value="06:30">06:30</option>
                                    <option value="06:45">06:45</option>
                                    <option value="07:00">07:00</option>
                                    <option value="07:15">07:15</option>
                                    <option value="07:30">07:30</option>
                                    <option value="07:45">07:45</option>
                                    <option value="08:00">08:00</option>
                                    <option value="08:15">08:15</option>
                                    <option value="08:30">08:30</option>
                                    <option value="08:45">08:45</option>
                                    <option value="09:00">09:00</option>
                                    <option value="09:15">09:15</option>
                                    <option value="09:30">09:30</option>
                                    <option value="09:45">09:45</option>
                                    <option value="10:00">10:00</option>
                                    <option value="10:15">10:15</option>
                                    <option value="10:30">10:30</option>
                                    <option value="10:45">10:45</option>
                                    <option value="11:00">11:00</option>
                                    <option value="11:15">11:15</option>
                                    <option value="11:30">11:30</option>
                                    <option value="11:45">11:45</option>
                                    <option value="12:00">12:00</option>
                                    <option value="12:15">12:15</option>
                                    <option value="12:30">12:30</option>
                                    <option value="12:45">12:45</option>
                                    <option value="13:00">13:00</option>
                                    <option value="13:15">13:15</option>
                                    <option value="13:30">13:30</option>
                                    <option value="13:45">13:45</option>
                                    <option value="14:00">14:00</option>
                                    <option value="14:15">14:15</option>
                                    <option value="14:30">14:30</option>
                                    <option value="14:45">14:45</option>
                                    <option value="15:00">15:00</option>
                                    <option value="15:15">15:15</option>
                                    <option value="15:30">15:30</option>
                                    <option value="15:45">15:45</option>
                                    <option value="16:00">16:00</option>
                                    <option value="16:15">16:15</option>
                                    <option value="16:30">16:30</option>
                                    <option value="16:45">16:45</option>
                                    <option value="17:00">17:00</option>
                                    <option value="17:15">17:15</option>
                                    <option value="17:30">17:30</option>
                                    <option value="17:45">17:45</option>
                                    <option value="8:00">18:00</option>
                                    <option value="18:15">18:15</option>
                                    <option value="18:30">18:30</option>
                                    <option value="18:45">18:45</option>
                                    <option value="19:00">19:00</option>
                                    <option value="19:15">19:15</option>
                                    <option value="19:30">19:30</option>
                                    <option value="19:45">19:45</option>
                                    <option value="20:00">20:00</option>
                                    <option value="20:15">20:15</option>
                                    <option value="20:30">20:30</option>
                                    <option value="20:45">20:45</option>
                                    <option value="21:00">21:00</option>
                                    <option value="21:15">21:15</option>
                                    <option value="21:30">21:30</option>
                                    <option value="21:45">21:45</option>
                                    <option value="22:00">22:00</option>
                                    <option value="22:15">22:15</option>
                                    <option value="22:30">22:30</option>
                                    <option value="22:45">22:45</option>
                                    <option value="23:00">23:00</option>
                                    <option value="23:15">23:15</option>
                                    <option value="23:30">23:30</option>
                                    <option value="23:45">23:45</option>
                                </select>
                                {touched.departureTime && errors.departureTime && <span className={styles['create-trip-errors']}>{errors.departureTime}</span>}
                            </div>
                        </div>
                        <div className={styles['form-group']}>
                            <div className={styles['form-row']}>
                                <label htmlFor="tripImg">Trip image url</label>
                                <input
                                    type="text"
                                    id="tripImg"
                                    name="tripImg"
                                    placeholder="http://..."
                                    value={values.tripImg}
                                    onChange={onChangeHandler}
                                    onBlur={onBlurHandler}
                                    onFocus={onFocusHandler}
                                />
                                {touched.tripImg && errors.tripImg && <span className={styles['create-trip-errors']}>{errors.tripImg}</span>}
                            </div>
                            <div className={styles['form-row']}>
                                <label htmlFor="busNumber">Bus Number</label>
                                <input
                                    type="number"
                                    id="busNumber"
                                    name="busNumber"
                                    placeholder="80"
                                    value={values.busNumber}
                                    onChange={onChangeHandler}
                                    onBlur={onBlurHandler}
                                    onFocus={onFocusHandler}
                                />
                                {touched.busNumber && errors.busNumber && <span className={styles['create-trip-errors']}>{errors.busNumber}</span>}
                            </div>
                        </div>
                        <div className={styles['form-group']}>
                            <div className={styles['form-row']}>
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    placeholder="Description text"
                                    value={values.description}
                                    onChange={onChangeHandler}
                                    onBlur={onBlurHandler}
                                    onFocus={onFocusHandler}
                                />
                                {touched.description && errors.description && <span className={styles['create-trip-errors']}>{errors.description}</span>}
                            </div>
                            <div className={styles['form-row']}>
                                <label htmlFor="nights">Nights</label>
                                <input
                                    type="number"
                                    id="nights"
                                    name="nights"
                                    placeholder="5"
                                    value={values.nights}
                                    onChange={onChangeHandler}
                                    onBlur={onBlurHandler}
                                    onFocus={onFocusHandler}
                                />
                                {touched.nights && errors.nights && <span className={styles['create-trip-errors']}>{errors.nights}</span>}
                            </div>
                        </div>
                        <div className={styles['form-group']}>
                            <div className={styles['form-row']}>
                                <label htmlFor="priceOfTrip">Price of trip</label>
                                <input
                                    type="number"
                                    id="priceOfTrip"
                                    name="priceOfTrip"
                                    placeholder="50"
                                    value={values.priceOfTrip}
                                    onChange={onChangeHandler}
                                    onBlur={onBlurHandler}
                                    onFocus={onFocusHandler}
                                />
                                {touched.priceOfTrip && errors.priceOfTrip && <span className={styles['create-trip-errors']}>{errors.priceOfTrip}</span>}
                            </div>
                            <div className={styles['form-row']}>
                                <label htmlFor="currency">Currency</label>
                                <select
                                    name="currency"
                                    id="currency"
                                    value={values.currency}
                                    onChange={onChangeHandler}
                                    onBlur={onBlurHandler}
                                    onFocus={onFocusHandler}
                                >
                                    <option value="-----">-----</option>
                                    <option value="lv">Lv</option>
                                    <option value="eu">Eu</option>
                                </select>
                                {touched.currency && errors.currency && <span className={styles['create-trip-errors']}>{errors.currency}</span>}
                            </div>
                        </div>
                        <div className={styles['form-group']}>
                            <div className={styles['form-row']}>
                                <label htmlFor="luggageSpace">Max luggage Space (kg)</label>
                                <input
                                    type="number"
                                    id="luggageSpace"
                                    name="luggageSpace"
                                    placeholder="20"
                                    value={values.luggageSpace}
                                    onChange={onChangeHandler}
                                    onBlur={onBlurHandler}
                                    onFocus={onFocusHandler}
                                />
                                {touched.luggageSpace && errors.luggageSpace && <span className={styles['create-trip-errors']}>{errors.luggageSpace}</span>}
                            </div>
                            <div className={styles['form-row']}>
                                <label htmlFor="food">Food</label>
                                <select
                                    name="food"
                                    id="food"
                                    value={values.food}
                                    onChange={onChangeHandler}
                                    onBlur={onBlurHandler}
                                    onFocus={onFocusHandler}
                                >
                                    <option value="-----">-----</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                                {touched.food && errors.food && <span className={styles['create-trip-errors']}>{errors.food}</span>}
                            </div>
                        </div>
                        <div className={styles['form-group']}>
                            <div className={styles['form-row']}>
                                <label htmlFor="wiFi">Wi-Fi</label>
                                <select
                                    name="wiFi"
                                    id="wiFi"
                                    value={values.wiFi}
                                    onChange={onChangeHandler}
                                    onBlur={onBlurHandler}
                                    onFocus={onFocusHandler}
                                >
                                    <option value="-----">-----</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                                {touched.wiFi && errors.wiFi && <span className={styles['create-trip-errors']}>{errors.wiFi}</span>}
                            </div>
                            <div className={styles['form-row']}>
                                <label htmlFor="drinks">Drinks</label>
                                <select
                                    name="drinks"
                                    id="drinks"
                                    value={values.drinks}
                                    onChange={onChangeHandler}
                                    onBlur={onBlurHandler}
                                    onFocus={onFocusHandler}
                                >
                                    <option value="-----">-----</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                                {touched.drinks && errors.drinks && <span className={styles['create-trip-errors']}>{errors.drinks}</span>}
                            </div>
                        </div>
                        <div className={styles['form-group']}>
                            <div className={styles['form-row']}>
                                <label htmlFor="powerOutlets">Power Outlets</label>
                                <select
                                    name="powerOutlets"
                                    id="powerOutlets"
                                    value={values.powerOutlets}
                                    onChange={onChangeHandler}
                                    onBlur={onBlurHandler}
                                    onFocus={onFocusHandler}
                                >
                                    <option value="-----">-----</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                                {touched.powerOutlets && errors.powerOutlets && <span className={styles['create-trip-errors']}>{errors.powerOutlets}</span>}
                            </div>


                            <div className={styles['form-row']}>
                                <label htmlFor="legRoom">Leg Room</label>
                                <select
                                    name="legRoom"
                                    id="legRoom"
                                    value={values.legRoom}
                                    onChange={onChangeHandler}
                                    onBlur={onBlurHandler}
                                    onFocus={onFocusHandler}
                                >
                                    <option value="-----">-----</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                                {touched.legRoom && errors.legRoom && <span className={styles['create-trip-errors']}>{errors.legRoom}</span>}
                            </div>
                        </div>
                        <div className={styles['create-btn-trip']}>
                            <input type="submit" value="Create" />
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}