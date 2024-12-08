import { Server, Socket } from "socket.io";
import Redis, { RedisOptions } from "ioredis";
import * as Credential from "./credential";
import {Server as HttpServer} from 'http'

interface Message {
  message: string;
}

const redisConfig: RedisOptions = {
  host: Credential.REDIS_HOST, 
  port: Number(Credential.REDIS_PORT),
  username: Credential.REDIS_USERNAME, 
  password: Credential.REDIS_PASSWORD
};

const pub = new Redis(redisConfig);
const sub = new Redis(redisConfig);

class SocketService {
  private _io: Server;

  constructor(httpServer: HttpServer) {
    console.log("Init Socket Service...");
    this._io = new Server({
      cors: { allowedHeaders: ["*"], origin: "*", credentials:true },
    });
    this._io.attach(httpServer);
    sub.subscribe("MESSAGES");
  }

  public initListeners(): void {
    const io = this.io;
    console.log("Init Socket Listeners...");

    io.on("connection", (socket: Socket) => {
      console.log(`New Socket Connected`, socket.id);
      socket.on("newMessage", async ({ message }: Message) => {
        console.log("New Message Rec.", message);
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });

    sub.on("message", async (channel: string, message: string) => {
      if (channel === "MESSAGES") {
        console.log("new message from redis", message);
        io.emit("message", message);
      }
    });
  }

  private get io(): Server {
    return this._io;
  }
}

export default SocketService;
