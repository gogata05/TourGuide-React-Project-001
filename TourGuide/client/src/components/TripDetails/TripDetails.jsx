import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from './TripDetails.module.css';
import { useNavigate } from "react-router-dom";
import * as tripService from '../../services/tripService';
import { formatDate } from '../../utils/dateUtil';
import { useAuthContext } from '../../contexts/AuthContext';
import { Loading } from "../Loading";

export const TripDetails = () => {
    const { tripId } = useParams();
    const { userId, isAuthenticated } = useAuthContext();
    const [detailsTrip, setDetailsTrip] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        tripService.getOneTrip(tripId)
            .then(trip => {
                setDetailsTrip(trip);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(`Trip details GM ${err}`)
            })
    }, [tripId]);

    const handleDelete = () => {
        tripService.deleteTrip(tripId).then(() => {
            navigate('/trip/create-trip');
        }).catch(error => {
            console.log('Error deleting trip GM', error);
        });
    }

    return (
        <>
            {isLoading
                ? <Loading />
                : <section className={styles['trip-details']}>
                    <h3>Trip Details</h3>
                    <div className={styles.container}>
                        <div className={styles['trip-wrapper']}>

                            <div className={styles['trip-info']}>
                                <h5>Trip info</h5>
                                <div className={styles['trip-info-columns']}>
                                    <div className={styles.route}>
                                        <h6><i className="fa-solid fa-location-dot"></i><span>From:</span>{detailsTrip.cityOfDeparture}</h6>
                                        <p><i className="fa-solid fa-chevron-right"></i></p>
                                        <h6><i className="fa-solid fa-location-dot"></i><span>To:</span>{detailsTrip.cityOfArrival}</h6>
                                    </div>
                                    <div className={styles['date-time']}>
                                        <p><i className="fa-solid fa-calendar-days"></i><span>Date:</span>{formatDate(detailsTrip.dateOfTrip)}</p>
                                        <p><i className="fa-solid fa-gas-pump"></i><span>Price:</span>{detailsTrip.priceOfTrip}{detailsTrip.currency}</p>
                                    </div>
                                    <div className={styles['price-place']}>
                                        <p><i className="fa-solid fa-clock"></i><span>Clock:</span>{detailsTrip.departureTime}</p>
                                        <p><i className="fa-solid fa-moon"></i><span>Nights:</span>{detailsTrip.nights}</p>
                                    </div>


                                    {detailsTrip.owner?._id === userId ? (
                                        <div className={styles['trip-btn']}>
                                            <Link onClick={handleDelete}><i className="fa-solid fa-trash"></i>Delete</Link>
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            <div className={styles['car-info']}>
                                <h5>Car info</h5>
                                <div className={styles['car-info-columns']}>
                                    <div className={styles['left-car-info']}>
                                        <p><i className="fa-solid fa-car"></i><span>Price Of Trip:</span>{detailsTrip.priceOfTrip}</p>
                                        <p><i className="fa-solid fa-suitcase"></i><span>Luggage space (Kg):</span>{detailsTrip.luggageSpace}</p>
                                        <p><i className="fa-solid fa-snowflake"></i><span>Wi-Fi:</span>{detailsTrip.wiFi}</p>
                                        <p><i className="fa-solid fa-paw"></i><span>Power Outlets:</span>{detailsTrip.powerOutlets}</p>
                                        <p><i className="fa-solid fa-joint"></i><span>Leg Room:</span>{detailsTrip.legRoom}</p>
                                    </div>
                                    <div className={styles['right-car-info']}>
                                        <p><i className="fa-solid fa-car"></i><span>Bus Number:</span>{detailsTrip.busNumber}</p>
                                        <p><i className="fa-solid fa-moon"></i><span>Nights:</span>{detailsTrip.nights}</p>
                                        <p><i className="fa-solid fa-utensils"></i><span>Food:</span>{detailsTrip.food}</p>
                                        <p><i className="fa-solid fa-mug-hot"></i><span>Drinks:</span>{detailsTrip.drinks}</p>
                                        <p><i className="fa-solid fa-align-left"></i><span>Description:</span>{detailsTrip.description}</p>
                                    </div>
                                    <div className={styles['car-info-media']}>
                                        <img src={detailsTrip.tripImg} alt={`${detailsTrip.description}${detailsTrip.cityOfDeparture} Image`} />
                                    </div>
                                </div>
                            </div>

                            <div className={styles['driver-info']}>
                                <h5>Tour Guide info</h5>
                                <div className={styles['driver-info-columns']}>
                                    <div className={styles['trip-info-media']}>
                                        <img src={detailsTrip.owner?.profilePicture} alt={`${detailsTrip.owner?.firstName} Picture`} />
                                    </div>
                                    <div className={styles['trip-info-content']}>
                                        <ul>
                                            <li><span>First Name:</span>{detailsTrip.owner?.firstName}</li>
                                            <li><span>Last Name:</span>{detailsTrip.owner?.lastName}</li>
                                            <li><span>Username:</span>{detailsTrip.owner?.username}</li>
                                            {isAuthenticated
                                                ?
                                                <>
                                                    <li><span>Email:</span>{detailsTrip.owner?.email}</li>
                                                    <li><span>Phone:</span>{detailsTrip.owner?.phone}</li>
                                                </>
                                                :
                                                <>
                                                    <li><span>Email:</span>*********</li>
                                                    <li><span>Phone:</span>*********</li>
                                                </>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}
