import mongoose from "mongoose";

const connectDb = ()=> {
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("Connected to DataBase Successfully");
    })
    .catch((error)=>{
        console.log("Error while connecting to Database : ", error);
    });
}

export default connectDb;