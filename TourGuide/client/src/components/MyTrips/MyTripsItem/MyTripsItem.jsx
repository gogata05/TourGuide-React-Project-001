import React from "react";
import styles from './MyTripsItem.module.css';

import { Link } from "react-router-dom";

import { formatDate } from '../../../utils/dateUtil'

export const MyTripsItem = ({
    myTrip
}) => {
    return (
        <div className={styles['my-trip-card']}>
            <div className={styles['my-trip-media']}>
                <img src={myTrip.owner?.profilePicture} alt={`${myTrip.owner?.firstName} pic`}/>
                <p>{myTrip.owner?.firstName}</p>
            </div>
            <div className={styles['my-trip-content-left']}>
                <ul>
                    <li><span>From:</span>{myTrip.cityOfDeparture}</li>
                    <li><span>Date:</span>{formatDate(myTrip.dateOfTrip)}</li>
                    <li><span>Price:</span>{myTrip.priceOfTrip}{myTrip.currency}</li>
                    <li><span>busNumber:</span>{myTrip.busNumber}</li>
                </ul>
            </div>
            <div className={styles['my-trip-content-right']}>
                <ul>
                    <li><span>To:</span>{myTrip.cityOfArrival}</li>
                    <li><span>Time:</span>{myTrip.departureTime}</li>
                    <li><span>Nights:</span>{myTrip.nights}</li>
                    <li><Link to={`/trip/trip-details/${myTrip._id}`}>To the trip</Link></li>
                </ul>
            </div>
        </div>

    )
}