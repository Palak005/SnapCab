import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        minlength : [3, "Username should be atleast 3 characters long"],
    },
    email : {
        type: String,
        required: true,
        unique : true,
        minlength : [5, "Email should be atleast 5 characters long"],
    },
    password : {
        type : String,
        required : true,
        minLength: [5, "Password should be atleast 5 characters long"],
    },
    sockedId : {
        //For tracking the captain location
        type : String,
    },
    status : {
        type: String,
        enum : ["active", "inactive"],
        default : "inactive",
    },
    vehicle : {
        color : {
            type : String,
            minLength : [3, "Color's name length should be atleast 3"],
        },
        plate : {
            type : String,
            minLength : [3, "Min Length must be 3"],
        },
        capacity : {
            type : Number,
            min : [1, "Capacity must be atleast 1"],
        },
        vehicleType : {
            type : String,
            enum : ["Car", "Bike", "Auto"],
            default : "Car",
        }
    },
    location : {
        latitude : {
            type : Number,
        },
        longitude : {
            type : Number,
        }
    }
});

captainSchema.statics.hashPassword = async(password)=>{
    return await bcrypt.hash(password, 10);
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({captainId : this._id}, process.env.SECRET_KEY);
    return token;
}

const Captain = mongoose.model("Captain", captainSchema);

export default Captain;