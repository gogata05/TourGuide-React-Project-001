import React from "react";
import { Link } from "react-router-dom";

import { formatDate } from '../../../utils/dateUtil'
import styles from './MyTripsItem.module.css';


export const MyTripsItem = ({
    myTrip
}) => {
    return (
        <div className={styles['my-trip-card']}>
            <div className={styles['my-trip-media']}>
                 <img src={myTrip.tripImg} alt={`${myTrip.tripImg} Image`}/>
                <p>{myTrip.cityOfArrival}</p>
            </div>
            <div className={styles['my-trip-content-left']}>
                <ul>
                    <li><span>From:</span>{myTrip.cityOfDeparture}</li>
                    <li><span>Date:</span>{formatDate(myTrip.dateOfTrip)}</li>
                    <li><span>Price:</span>{myTrip.priceOfTrip}{myTrip.currency}</li>
                    <li><span>BusNumber:</span>{myTrip.busNumber}</li>
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