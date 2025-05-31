import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        default: "https://res.cloudinary.com/dz3qj1x8h/image/upload/v1735681234/doctor.png",
        required: true,
    },
    speciality:{
        type: String,
        required: true,
    },
    degree:{
        type: String,
        required: true,
    },
    experience:{
        type: String,
        required: true,
    },
    about:{
        type: String,
        required: true,
    },
    available:{
        type: Boolean,
        default: true,
    },
    fees:{
        type: Number,
        required: true,
    },
    address:{
        type: Object,
        required: true,
    },
    date:{
        type: Number,
        // default: Date.now,
        required: true,
    },
    slots_booked:{
        type: Object,
        default: {},
    },
    

},{minimize: false});

const doctorModel = mongoose.models.doctor ||  mongoose.model("doctor", doctorSchema);

export default doctorModel;