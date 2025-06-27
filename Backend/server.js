import { createServer } from "http";
import connectDb from "./Db/connectDb.js";
import app from "./app.js";
import { Server } from "socket.io";
import User from "./models/user.model.js";
import Captain from "./models/captain.model.js";
import { symlinkSync } from "fs";

const server = createServer(app);
const PORT = process.env.PORT;

const io = new Server(server);

io.on("connection", (socket)=>{
    console.log("Client Connected : ", socket.id);

    socket.on("join", async({id, type})=>{
        if(type === "user"){
            await User.findByIdAndUpdate(id, {
                socketId : socket.id
            })
        }else if(type == "captain"){
            await Captain.findByIdAndUpdate(id, {
                socketId : socket.id
            })
        }

        console.log(type, "with id :", id, "connected");
    });

    socket.on("disconnect", ()=>{
        console.log("Client Disconnected : ", socket.id);
    })
});


server.listen(PORT, ()=>{
    connectDb();
    console.log("Server is listening");
});