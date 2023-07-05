import { Request } from "express";
import multer from "multer";
import path = require("path");
let MAX_SIZE = 20 * 1024 * 1024;

var storage = multer.diskStorage({
     destination: function (req, file, cb) {
          let pathfile = path.join(__dirname, "../../public/image");
          cb(null, pathfile);
     },
     filename: function (req, file, cb) {
          cb(null, file.originalname);
     },
});

const upload = multer({ storage: storage, limits: { fileSize: MAX_SIZE } });
export interface MulterRequest extends Request {
     file: any;
}

export { upload };
