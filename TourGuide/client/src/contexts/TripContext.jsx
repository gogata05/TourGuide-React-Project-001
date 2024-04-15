import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import * as tripService from '../services/tripService';
import { useAuthContext } from '../contexts/AuthContext'

export const TripContext = createContext();

export const TripProvider = ({
    children
}) => {

    const [trip, setTrip] = useState({});
    const [serverError, setServerError] = useState('');

    const { userId } = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setServerError('')
        }, 2000);

    }, [serverError])

    // const onCreateTripSubmit = async (tripData) => {

    //     try {

    //         tripData.owner = userId;

    //         const newTrip = await tripService.createTrip(tripData);

    //         setTrip(newTrip);

    //         navigate('/all-trips');
    //     } catch (error) {
    //         console.log(error);
    //         setServerError(error.message);
    //     }
    // }

    // const onEditTripSubmit = async (tripData) => {
            
    //     try {

    //         const editTrip = await tripService.editTrip(tripData._id, tripData);

    //         setTrip(editTrip);

    //         navigate(`/trip/trip-details/${tripData._id}`);
    //     } catch (error) {
    //         setServerError(error.message);
    //     }

    // }

    const context = {
        onCreateTripSubmit,
        onEditTripSubmit,
        tripId: trip._id,
        cityOfDeparture: trip.cityOfDeparture,
        cityOfArrival: trip.cityOfArrival,
        dateOfTrip: trip.dateOfTrip,
        departureTime: trip.departureTime,
        busNumber: trip.busNumber,
        description: trip.description,
        tripImg: trip.tripImg,
        nights: trip.nights,
        priceOfTrip: trip.priceOfTrip,
        currency: trip.currency,
        wiFi: trip.wiFi,
        food: trip.food,
        luggageSpace: trip.luggageSpace,
        powerOutlets: trip.powerOutlets,
        drinks: trip.drinks,
        legRoom: trip.legRoom,
        serverError,
    }

    return (
        <>
            <TripContext.Provider value={context}>
                {children}
            </TripContext.Provider>
        </>
    )
}
export const useTripContext = () => {
    const context = useContext(TripContext);
    return context;
}
