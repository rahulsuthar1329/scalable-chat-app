"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const ioredis_1 = __importDefault(require("ioredis"));
const Credential = __importStar(require("./credential"));
const redisConfig = {
    host: Credential.REDIS_HOST,
    port: Number(Credential.REDIS_PORT),
    username: Credential.REDIS_USERNAME,
    password: Credential.REDIS_PASSWORD
};
const pub = new ioredis_1.default(redisConfig);
const sub = new ioredis_1.default(redisConfig);
class SocketService {
    constructor(httpServer) {
        console.log("Init Socket Service...");
        this._io = new socket_io_1.Server({
            cors: { allowedHeaders: ["*"], origin: "*", credentials: true },
        });
        this._io.attach(httpServer);
        sub.subscribe("MESSAGES");
    }
    initListeners() {
        const io = this.io;
        console.log("Init Socket Listeners...");
        io.on("connection", (socket) => {
            console.log(`New Socket Connected`, socket.id);
            socket.on("newMessage", ({ message }) => __awaiter(this, void 0, void 0, function* () {
                console.log("New Message Rec.", message);
                yield pub.publish("MESSAGES", JSON.stringify({ message }));
            }));
        });
        sub.on("message", (channel, message) => __awaiter(this, void 0, void 0, function* () {
            if (channel === "MESSAGES") {
                console.log("new message from redis", message);
                io.emit("message", message);
            }
        }));
    }
    get io() {
        return this._io;
    }
}
exports.default = SocketService;
