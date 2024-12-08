"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_1 = __importDefault(require("./config/socket"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const credential_1 = require("./config/credential");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const corsOptions = {
    origin: ["http://192.168.66.132:8081"]
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
app.get("/", (_, res) => {
    console.log("Called...");
    res.json({ message: "Reached..." });
});
const httpServer = (0, http_1.createServer)(app);
const socketService = new socket_1.default(httpServer);
socketService.initListeners();
httpServer.listen(credential_1.PORT, () => {
    console.log(`Server is running on port: ${credential_1.PORT}`);
});
