const router = require('express').Router();

const tripServices = require('../services/tripServices');
const { getErrorMessage } = require('../utils/errorHelper');

router.get('/allTrip', async (req, res) => {

    try {

        const { page = 1, limit = 10, search } = req.query;

        let query = {}
        if (search) {
            const searchRegex = new RegExp(search, 'i');
            query = {
                $or: [
                    { cityOfDeparture: { $regex: searchRegex } },
                    { car: { $regex: searchRegex } },
                    { firstName: { $regex: searchRegex } },
                ],
            };
        }
        const trips = await tripServices.getAllTrip(query, page, limit);

        res.json(trips);
    } catch (error) {
        res.status(400).json({
            message: getErrorMessage(error)
        });
    }
});

router.post('/createTrip', async (req, res) => {

    try {

        const {
          cityOfDeparture,
          cityOfArrival,
          dateOfTrip,
          departureTime,
          busNumber,
          description,
          tripImg,
          nights,
          priceOfTrip,
          currency,
          wiFi,
          food,
          luggageSpace,
          powerOutlets,
          drinks,
          legRoom,
          comments,
          owner,
        } = req.body;

        const createTrip = await tripServices.createTrip({
          cityOfDeparture,
          cityOfArrival,
          dateOfTrip,
          departureTime,
          busNumber,
          description,
          tripImg,
          nights,
          priceOfTrip,
          currency,
          wiFi,
          food,
          luggageSpace,
          powerOutlets,
          drinks,
          legRoom,
          comments,
          owner,
        });
        res.status(201).json(createTrip);
    } catch (error) {
        res.status(400).json({
            message: error.message
            // message: getErrorMessage(error)
        });
    }
});

router.get('/details/:tripId', async (req, res) => {

    try {

        const tripId = req.params.tripId;
        const trip = await tripServices.getOne(tripId);

        res.status(200).json(trip); //???
    } catch (error) {
        res.status(400).json({
            message: getErrorMessage(error)
        });
    }
});

router.put('/edit/:tripId', async (req, res) => {

    try {

        const editTrip = await tripServices.editTrip(req.params.tripId, req.body);

        res.status(200).json(editTrip);
    } catch (error) {
        res.status(400).json({
            message: getErrorMessage(error)
        });
    }
});

router.delete('/delete/:tripId', async (req, res) => {

    try {

        const tripId = req.params.tripId;
        await tripServices.deleteTrip(tripId);

        res.status(200).end();
    } catch (error) {
        res.status(400).json({
            message: getErrorMessage(error)
        });
    }
});

router.get('/myTrips/:userId', async (req, res) => {

    try {

        const userId = req.params.userId;
        const trips = await tripServices.myTrip(userId);

        res.status(200).json(trips); // ???
    } catch (error) {
        res.status(400).json({
            message: getErrorMessage(error)
        });
    }
});

router.get('/lastThreeTrips', async (req, res) => {
    try {
        const trips = await tripServices.getLastThreeTrips();
        res.status(200).json(trips);
    } catch (error) {
        res.status(400).json({
            message: getErrorMessage(error)
        });
    }
});

module.exports = router;