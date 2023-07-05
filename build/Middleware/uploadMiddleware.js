"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path = require("path");
let MAX_SIZE = 20 * 1024 * 1024;
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        let pathfile = path.join(__dirname, "../../public/image");
        cb(null, pathfile);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage, limits: { fileSize: MAX_SIZE } });
exports.upload = upload;
