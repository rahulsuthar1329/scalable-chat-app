"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.REDIS_PASSWORD = exports.REDIS_USERNAME = exports.REDIS_PORT = exports.REDIS_HOST = exports.MONGO_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envConfig = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_USERNAME: process.env.REDIS_USERNAME,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
};
exports.MONGO_URI = envConfig.MONGO_URI;
exports.REDIS_HOST = envConfig.REDIS_HOST;
exports.REDIS_PORT = envConfig.REDIS_PORT;
exports.REDIS_USERNAME = envConfig.REDIS_USERNAME;
exports.REDIS_PASSWORD = envConfig.REDIS_PASSWORD;
exports.PORT = envConfig.PORT;
