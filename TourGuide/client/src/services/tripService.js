import * as requester from "../services/requester";

export const getAllTrip = async page => {
  try {
    const result = await requester.get(`/trips/allTrip?page=${page}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTripWithSearch = async (searchQuery, page) => {
  try {
    const url = `/trips/allTrip?page=${page}${searchQuery ? `&search=${searchQuery}` : ""}`;
    const result = await requester.get(url);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getOneTrip = async tripId => {
  try {
    const result = await requester.get(`/trips/details/${tripId}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getMyTrip = async userId => {
  try {
    const result = await requester.get(`/trips/myTrips/${userId}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const createTrip = async tripData => {
  try {
    const result = await requester.post("/trips/createTrip", tripData);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const editTrip = async (tripId, tripData) => {
  try {
    const result = await requester.put(`/trips/edit/${tripId}`, tripData);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTrip = async tripId => {
  try {
    await requester.del(`/trips/delete/${tripId}`);
    return Promise.resolve();
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const getLastThreeTrips = async () => {
  try {
    const result = await requester.get(`/trips/lastThreeTrips`);
    return result;
  } catch (error) {
    console.log(error);
  }
};
