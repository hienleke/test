"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RDB = exports.connectRDB = void 0;
const redis_1 = require("redis");
const client = (0, redis_1.createClient)({
    password: "ARHkxFn5vQ6Jin0cpBh6nvx8098NVEsW",
    socket: {
        host: "redis-16624.c290.ap-northeast-1-2.ec2.cloud.redislabs.com",
        port: 16624,
    },
});
exports.RDB = client;
function connectRDB() {
    return __awaiter(this, void 0, void 0, function* () {
        client.on("ready", () => {
            console.log("Connected redis!");
        });
        client.on("error", (err) => {
            console.error(err);
        });
        return yield client.connect();
    });
}
exports.connectRDB = connectRDB;
