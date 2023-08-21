const mongoose = require("mongoose");

const appoinmentSchema = mongoose.Schema(
    {
        name : String,
        image : String,
        specialization : String,
        experience : Number,
        location : String,
        date : Date,
        slots : Number,
        fee : Number
    }
);


const AppoinmentModel = mongoose.model("appoinment",appoinmentSchema);


module.exports = AppoinmentModel;