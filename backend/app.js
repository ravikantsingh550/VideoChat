import express from "express";
import {createServer} from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import connectToSocket from "./src/controllers/socketManger.js";


const app = express();
const server = createServer(app);
const io = connectToSocket(server );

app.set("port" , (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb" , extended:true}))



const connectionDb = await mongoose.connect("mongodb://royalravibhojpur_db_user:RaviVideoChat@ac-ywp0sqk-shard-00-00.vvk7sic.mongodb.net:27017,ac-ywp0sqk-shard-00-01.vvk7sic.mongodb.net:27017,ac-ywp0sqk-shard-00-02.vvk7sic.mongodb.net:27017/?ssl=true&replicaSet=atlas-125poq-shard-0&authSource=admin&appName=Cluster0")
    console.log("db connected")
  server.listen(app.get("port") , ()=>{
    console.log("listing on port 8000");
});