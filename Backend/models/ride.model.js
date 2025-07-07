import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    captain : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Captain',
    },
    pickup : {
        type : String,
        required : true,
    },
    destination : {
        type : String,
        required : true,
    },
    fare : {
        type : Number,
        required : true,
    },
    vehicleType : {
        type : String,
        enum : ['Car', 'Bike', 'Auto', 'Tukk Tukk'],
        required : true,
    },
    status : {
        type : String,
        enum : ['pending','accepted', 'ongoing', 'completed', 'cancelled'],
        default : 'pending'
    },
    duration : {
        type : Number,//Storing in seconds
    },
    distance : {
        type : Number,//Storing in meters
    },
    paymentId : {
        type : String,
    }, 
    orderId : {
        type : String,
    },
    signature : {
        type : String,
    }
}, {
    timestamps : true,
});

const Ride = mongoose.model("Ride", rideSchema);
export default Ride;