const Trip = require('../models/Trip');

const commentServices = require('../services/commentServices');

exports.getAllTrip = async (query, page, limit) => {

    try {
        const trips = Trip.find(query)
            .populate('owner')
            .sort({ createdAt: 'desc' })
            .skip((page - 1) * limit)
            .limit(Number(limit));
        return trips
    } catch (error) {
        console.error('Error fetching trips:', error);
        throw error;
    }
}

exports.createTrip = (tripData) => Trip.create(tripData);

exports.getOne = (tripId) => Trip.findById(tripId).populate('owner');

exports.editTrip = (tripId, tripData) => Trip.updateOne({ _id: tripId }, { $set: tripData }, { runValidators: true });

exports.deleteTrip = (tripId) => Trip.findByIdAndDelete(tripId);

exports.myTrip = (userId) => Trip.find({ owner: userId }).populate('owner');

exports.getLastThreeTrips = async () => {
    try {
        const trips = await Trip.find({})
            .populate('owner')
            .sort({ createdAt: -1 })
            .limit(3);
        return trips;
    } catch (error) {
        console.error('Error fetching last three trips:', error);
        throw error;
    }
}

exports.addCommentToTrip = async (tripId, userId, text) => {
    const comment = await commentServices.addComment(userId, text);
    const updatedTrip = await Trip.findByIdAndUpdate(tripId, { $push: { comments: comment._id } }, { new: true })
    return updatedTrip
}