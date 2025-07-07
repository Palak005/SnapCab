import { createServer } from "http";
import connectDb from "./Db/connectDb.js";
import app from "./app.js";
import { Server } from "socket.io";
import User from "./models/user.model.js";
import Captain from "./models/captain.model.js";

const server = createServer(app);
const PORT = process.env.PORT;

export const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",  
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket)=>{

    socket.on("join", async({id, type})=>{
        // console.log("Updating socket id", {id, type})
        if(type === "user"){
            await User.findByIdAndUpdate(id, {
                socketId : socket.id
            })
        }else if(type == "captain"){
            const captain = await Captain.findByIdAndUpdate(id, {
                socketId : socket.id
            }, {new : true});
        }

        console.log(type, "with id :", id, "connected");
    });

    socket.on("disconnect", ()=>{
        console.log("Client Disconnected : ", socket.id);
    });

    socket.on("update-captain-location", async(data)=>{
        //Updating the location of captain
        const {id, location} = data;
        // console.log(data);
        if(!location || !location.lat || !location.long){
            return socket.emit('error', {message : "Invalid Location Data"})
        }
        
        await Captain.findByIdAndUpdate(id, {location});
    });
});


export const broadCastRide = ({captains, ride})=>{

    for(let captain of captains){
        const socId = captain.socketId;
        console.log("Message set to", socId);

        io.to(socId).emit("rideCreated", {
            message : "Ride Created Successfully", 
            ride
        });
    }
}

server.listen(PORT, ()=>{
    connectDb();
    console.log("Server is listening");
});