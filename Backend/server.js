import { createServer } from "http";
import connectDb from "./Db/connectDb.js";
import app from "./app.js";

const server = createServer(app);
const PORT = process.env.PORT;

server.listen(PORT, ()=>{
    connectDb();
    console.log("Server is listening");
});