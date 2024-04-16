import React, { useEffect, useState } from "react";
import styles from './MyTrips.module.css';

import { useAuthContext } from '../../contexts/AuthContext';
import * as tripService from '../../services/tripService';
import { MyTripsItem } from "./MyTripsItem";
import { Loading } from "../Loading";

export const MyTrips = () => {

    const [myTrips, setMyTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { userId } = useAuthContext();

    useEffect(() => {
        tripService.getMyTrip(userId)
            .then(myTripsResults => {
                setMyTrips(myTripsResults)
                setIsLoading(false)
            })
    }, []);

    return (
        <section className={styles['my-trips']}>
            <h3>My Trips</h3>
            <div className={styles.container}>
                <div className={styles['my-trip-list']}>

                    {isLoading
                        ? < Loading />
                        : myTrips.map(myTrip => <MyTripsItem key={myTrip._id} myTrip={myTrip} />)
                    }
                    {myTrips.length === 0 && (
                        <h1 className={styles['no-trips']} >No trips yet</h1>
                    )}
                </div>
            </div>
        </section>
    )
}