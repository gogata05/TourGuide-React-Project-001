const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    cityOfDeparture: {
      type: String,
      required: [true, "City of departure is required!"],
      minLength: [3, "City of departure should be at least 3 characters!"],
      maxLength: [15, "City of departure must be no more 15 characters!"],
    },

    cityOfArrival: {
      type: String,
      required: [true, "City of arrival is required!"],
      minLength: [3, "City of arrival should be at least 3 characters!"],
      maxLength: [15, "City of arrival must be no more 15 characters!"],
    },

    dateOfTrip: {
      type: Date,
      required: [true, "Date is required!"],
    },

    departureTime: {
      type: String,
      required: [true, "Departure time is required!"],
    },

    busNumber: {
      type: Number,
      required: [true, "Bus Number field is required!"],
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: "Bus Number must be a non-negative number!",
      },
    },

    description: {
      type: String,
      required: [true, "Description field is required!"],
      maxLength: [20, "Description must be no more 20 characters"],
    },

    tripImg: {
      type: String,
      required: [true, "Trip img URL is required!"],
      match: [
        /^https?:\/\//,
        "The trip image is required and should start with http:// or https://!",
      ],
    },

    nights: {
      type: Number,
      required: [true, "Nights field is required!"],
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: "Nights must be a non-negative number!",
      },
    },

    priceOfTrip: {
      type: Number,
      required: [true, "Price of trip field is required!"],
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: "Price of trip must be a non-negative number!",
      },
    },

    currency: {
      type: String,
      required: [true, "Currency field is required!"],
      enum: ["lv", "eu"],
    },

    wiFi: {
      type: String,
      required: [true, "WiFi field is required!"],
      enum: ["yes", "no"],
    },

    food: {
      type: String,
      required: [true, "Food field is required!"],
      enum: ["yes", "no"],
    },

    luggageSpace: {
      type: Number,
      required: [true, "Luggage space field is required!"],
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: "Luggage space must be a non-negative number!",
      },
    },

    powerOutlets: {
      type: String,
      required: [true, "PowerOutlets field is required!"],
      enum: ["yes", "no"],
    },

    drinks: {
      type: String,
      required: [true, "Drinks field is required"],
      enum: ["yes", "no"],
    },

    legRoom: {
      type: String,
      required: [true, "Leg Room field is required!"],
      enum: ["yes", "no"],
    },

    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],

    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
