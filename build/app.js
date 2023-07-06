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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const uploadMiddleware_1 = require("./Middleware/uploadMiddleware");
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_config_1 = require("./inversify.config");
const UserRepository_1 = require("./Repository/UserRepository");
const UserController_1 = require("./Controllers/UserController");
const DepartmentController_1 = require("./Controllers/DepartmentController");
const dotenv = __importStar(require("dotenv"));
const DepartmentRepository_1 = require("./Repository/DepartmentRepository");
let bodyParser = require("body-parser");
dotenv.config();
let container = new inversify_1.Container();
container.loadAsync(inversify_config_1.bindings);
container.bind("UserRepository").to(UserRepository_1.UserRepository);
container.bind("DepartmentRepository").to(DepartmentRepository_1.DepartmentRepository);
container.bind("upload").toConstantValue(uploadMiddleware_1.upload);
(0, DepartmentController_1.controllerFactory)(container);
(0, UserController_1.controllerFactory)(container);
const server = new inversify_express_utils_1.InversifyExpressServer(container);
server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(bodyParser.json());
});
const app = server.build();
app.listen(3000);
