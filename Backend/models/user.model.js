import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
        minlength : [5, "Password should be atleast 5 characters long"],
    },
    socketId : {
        //For tracking the user location
        type : String,
    }
});

userSchema.statics.hashPassword = async(password)=>{
    return await bcrypt.hash(password, 10);
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAuthToken = function(){
    console.log(this);
    const token = jwt.sign({userId : this._id}, process.env.SECRET_KEY);
    return token;
}

const User = mongoose.model("User", userSchema);

export default User;