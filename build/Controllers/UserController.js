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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerFactory = void 0;
const uploadMiddleware_1 = require("../Middleware/uploadMiddleware");
const UserRepository_1 = require("./../Repository/UserRepository");
const express = __importStar(require("express"));
const inversify_express_utils_1 = require("inversify-express-utils");
const User_1 = require("../Models/User");
const inversify_1 = require("inversify");
const redisClient_1 = require("../redis/redisClient");
const UtilHelper_1 = require("../util/UtilHelper");
const fs = __importStar(require("fs"));
const path = require("path");
function controllerFactory(container) {
    let UserController = class UserController extends inversify_express_utils_1.BaseHttpController {
        constructor(_userRepository) {
            super();
            this._userRepository = _userRepository;
            this._container = container;
        }
        get(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                let { type_orm } = req.body;
                let data = yield this._userRepository.findAll(type_orm);
                res.json(data);
            });
        }
        getusermorethanage(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                let { type_orm } = req.body;
                let { age } = req.params;
                let data = yield this._userRepository.findUserWithAge(Number(age), type_orm);
                res.json(data);
            });
        }
        getuserbyid(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                let { id } = req.params;
                let { type_orm } = req.body;
                let user = yield this._userRepository.findbyID(Number(id), Number(type_orm));
                if (user) {
                    res.json(user);
                }
                else
                    res.json("not found");
            });
        }
        getuserbyidDeparment(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                let { id } = req.params;
                let { type_orm } = req.body;
                let user = yield this._userRepository.findbyIDdepartment(Number(id), type_orm);
                if (user) {
                    res.json(user);
                }
                else
                    res.json("not found");
            });
        }
        getuserfromredis(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                let { id } = req.params;
                let { type_orm } = req.body;
                let data = yield redisClient_1.RDB.get(id);
                console.log("Data  out :", data === null || data === void 0 ? void 0 : data.toString());
                if (!data) {
                    let user = yield this._userRepository.findbyID(Number(id), Number(type_orm));
                    if (user) {
                        res.json(user);
                        yield redisClient_1.RDB.set(id, JSON.stringify(user));
                    }
                    else
                        res.json("not found");
                }
                else {
                    console.log(" get data from cached");
                    res.json(JSON.parse(data));
                }
            });
        }
        getUserName(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                let map = this._userRepository._users.map((ele) => {
                    // let name = UtilHelper.toNonAccentVietnamese(ele._name);
                    let arr = ele._name.split(" ");
                    let returnname = "";
                    for (let i = 0; i < arr.length - 1; i++) {
                        returnname += arr[i].charAt(0);
                    }
                    return UtilHelper_1.UtilHelper.toNonAccentVietnamese(arr[arr.length - 1]) + "." + returnname;
                });
                const currentDate = new Date();
                let daysincurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
                const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                let day = weekday[currentDate.getDay()];
                res.json({ listnameshort: map, dayinweek: day, numdaysinMonth: daysincurrentMonth.getDate() });
            });
        }
        post(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                let { name, address, birthday, type_orm } = req.body;
                let _birthday = new Date(birthday);
                let user = new User_1.User(-1, name, _birthday ? _birthday : new Date(), address);
                let data = yield this._userRepository.create(user, type_orm);
                if (data)
                    res.json(data);
                else
                    res.json("unsuccessfully");
            });
        }
        delete(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                let { id } = req.params;
                let data = this._userRepository.delete(Number(id));
                if (data)
                    res.json(data);
                else
                    res.json("unsuccessfully");
            });
        }
        update(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                let { id, name, address, birthday } = req.body;
                let _birthday = new Date(birthday);
                let user = new User_1.User(Number(id), name, _birthday ? _birthday : new Date(), address);
                let data = this._userRepository.update(user);
                if (data)
                    res.json(data);
                else
                    console.error("err :", data);
                res.json("unsuccessfully");
            });
        }
        resizeImage(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                let { imageName } = req.params;
                let { width, height } = req.query;
                let pathfile = path.join(__dirname, "../../public/image/" + imageName);
                let pathdirector = path.join(__dirname, "../../public/image/");
                console.log(" path director : ", pathdirector);
                console.log(" path file : ", pathfile);
                console.log(" image name : ", imageName);
                if (fs.existsSync(pathfile)) {
                    console.log(" righ path");
                    UtilHelper_1.UtilHelper.resize(Number(width), Number(height), pathdirector, pathfile, imageName);
                }
                else {
                    res.json("invalid image");
                }
            });
        }
        uploadImage(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("image name :", req.file.path, req.file.mime);
                res.json({ file: req.file.name });
            });
        }
    };
    __decorate([
        (0, inversify_express_utils_1.httpGet)("/"),
        __param(0, (0, inversify_express_utils_1.request)()),
        __param(1, (0, inversify_express_utils_1.response)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "get", null);
    __decorate([
        (0, inversify_express_utils_1.httpGet)("/getusermorethanage/:age"),
        __param(0, (0, inversify_express_utils_1.request)()),
        __param(1, (0, inversify_express_utils_1.response)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "getusermorethanage", null);
    __decorate([
        (0, inversify_express_utils_1.httpGet)("/:id"),
        __param(0, (0, inversify_express_utils_1.request)()),
        __param(1, (0, inversify_express_utils_1.response)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "getuserbyid", null);
    __decorate([
        (0, inversify_express_utils_1.httpGet)("/getbydepartment/:id"),
        __param(0, (0, inversify_express_utils_1.request)()),
        __param(1, (0, inversify_express_utils_1.response)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "getuserbyidDeparment", null);
    __decorate([
        (0, inversify_express_utils_1.httpGet)("/cache/:id"),
        __param(0, (0, inversify_express_utils_1.request)()),
        __param(1, (0, inversify_express_utils_1.response)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "getuserfromredis", null);
    __decorate([
        (0, inversify_express_utils_1.httpGet)("/getsEX123"),
        __param(0, (0, inversify_express_utils_1.request)()),
        __param(1, (0, inversify_express_utils_1.response)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "getUserName", null);
    __decorate([
        (0, inversify_express_utils_1.httpPost)("/"),
        __param(0, (0, inversify_express_utils_1.request)()),
        __param(1, (0, inversify_express_utils_1.response)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "post", null);
    __decorate([
        (0, inversify_express_utils_1.httpDelete)("/:id"),
        __param(0, (0, inversify_express_utils_1.request)()),
        __param(1, (0, inversify_express_utils_1.response)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "delete", null);
    __decorate([
        (0, inversify_express_utils_1.httpPut)("/"),
        __param(0, (0, inversify_express_utils_1.request)()),
        __param(1, (0, inversify_express_utils_1.response)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "update", null);
    __decorate([
        (0, inversify_express_utils_1.httpGet)("/resize/:imageName"),
        __param(0, (0, inversify_express_utils_1.request)()),
        __param(1, (0, inversify_express_utils_1.response)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "resizeImage", null);
    __decorate([
        (0, inversify_express_utils_1.httpPost)("/uploadImage", uploadMiddleware_1.upload.single("recfile")),
        __param(0, (0, inversify_express_utils_1.request)()),
        __param(1, (0, inversify_express_utils_1.response)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "uploadImage", null);
    UserController = __decorate([
        (0, inversify_express_utils_1.controller)("/user"),
        __param(0, (0, inversify_1.inject)("UserRepository")),
        __metadata("design:paramtypes", [UserRepository_1.UserRepository])
    ], UserController);
}
exports.controllerFactory = controllerFactory;
