import mongoose from "mongoose";

const FlightSchema = mongoose.Schema({
    origin: {
        type: String,
        required: true
    },

    destination: {
        type: String,
        required: true
    },

    departureDateTime: {
        type: String,
        required: true
    },

    arrivalDateTime: {
        type: String,
        requiredDate: true
    },

    flightNo: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    }
});

const flightModel = mongoose.model('flight', FlightSchema);

export const flightSchema = flightModel.schema;
export default flightModel;
