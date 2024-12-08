import { createServer, Server } from "http";
import SocketService from "./config/socket";
import dotenv from 'dotenv'
import express from 'express'
import { PORT } from "./config/credential";
import cors from 'cors'

dotenv.config();

const corsOptions = {
    origin: ["http://192.168.66.132:8081"]
};

const app = express()

app.use(cors(corsOptions))

app.get("/", (_, res)=>{ 
    res.json({message:"Reached..."})}
)

const httpServer: Server = createServer(app);

const socketService = new SocketService(httpServer);

socketService.initListeners();

httpServer.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})