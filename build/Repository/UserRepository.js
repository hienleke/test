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
exports.userRepository = exports.UserRepository = void 0;
const type_1 = require("./../Types/type");
const fs = __importStar(require("fs"));
const User_1 = __importDefault(require("../Models/User"));
const inversify_1 = require("inversify");
const moment_1 = __importDefault(require("moment"));
const userSchema_1 = __importDefault(require("../Models/userSchema"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let UserRepository = exports.UserRepository = class UserRepository {
    constructor() {
        this._users = [];
        let jsonString = fs.readFileSync("src/mockjson/MOCK_DATA.json");
        let jsonData = JSON.parse(jsonString.toString());
        for (let ele of jsonData) {
            this._users.push(new User_1.default(ele._id, ele._name, new Date(ele._birthday), ele._address));
        }
    }
    findAll(type) {
        return __awaiter(this, void 0, void 0, function* () {
            //
            let userNeed2find;
            if (type == type_1.TYPE_ORM.sequelize) {
                userNeed2find = yield userSchema_1.default.findAll();
            }
            else if (type == type_1.TYPE_ORM.prisma) {
                userNeed2find = yield prisma.user.findMany({
                    select: {
                        id: true,
                        name: true,
                        departments: {
                            select: {
                                name: true,
                            },
                        },
                    },
                    // include: {
                    //      departments: true, // All posts where authorId == 20
                    // },
                });
                // console.log("🚀 ~ file: UserRepository.ts:56 ~ UserRepository ~ findbyIDdepartment ~ userNeed2find:", userNeed2find);
            }
            return userNeed2find ? userNeed2find : null;
        });
    }
    findUserWithAge(age, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let userNeed2find;
            let date = (0, moment_1.default)().subtract(20, "year").toDate();
            if (type == type_1.TYPE_ORM.sequelize) {
                userNeed2find = yield userSchema_1.default.findAll({
                    where: {
                        birthday: { lt: date },
                    },
                });
            }
            else if (type == type_1.TYPE_ORM.prisma) {
                const [user] = yield prisma.$transaction([
                    prisma.user.findMany({
                        where: {
                            birthday: { lt: date },
                        },
                        include: {
                            departments: { select: { name: true } },
                        },
                        take: 32767,
                    }),
                ]);
                userNeed2find = user;
            }
            return userNeed2find ? userNeed2find : null;
        });
    }
    findbyID(id, type) {
        return __awaiter(this, void 0, void 0, function* () {
            //
            let userNeed2find;
            if (type == type_1.TYPE_ORM.sequelize) {
                userNeed2find = yield userSchema_1.default.findByPk(id);
            }
            else if (type == type_1.TYPE_ORM.prisma) {
                userNeed2find = yield prisma.user.findUnique({
                    where: {
                        id: id,
                    },
                });
                console.log("🚀 ~ file: UserRepository.ts:37 ~ UserRepository ~ findbyID ~ userNeed2find:", userNeed2find);
            }
            return userNeed2find ? userNeed2find : null;
        });
    }
    findbyIDdepartment(id, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let userNeed2find;
            if (type == type_1.TYPE_ORM.sequelize) {
                userNeed2find = yield userSchema_1.default.findByPk(id);
            }
            else if (type == type_1.TYPE_ORM.prisma) {
                userNeed2find = yield prisma.department.findUnique({
                    where: {
                        id: id,
                    },
                    include: {
                        users: true, // All posts where authorId == 20
                    },
                });
                console.log("🚀 ~ file: UserRepository.ts:56 ~ UserRepository ~ findbyIDdepartment ~ userNeed2find:", userNeed2find);
            }
            return userNeed2find ? userNeed2find : null;
        });
    }
    create(user, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let newUser;
            if (type == type_1.TYPE_ORM.sequelize) {
                newUser = yield userSchema_1.default.create(user.toObject());
            }
            else if (type == type_1.TYPE_ORM.prisma) {
                newUser = yield prisma.user.create({ data: user.toObject() });
                console.log("🚀 ~ file: UserRepository.ts:43 ~ UserRepository ~ create ~ newUser:", newUser);
            }
            return newUser ? user : null;
        });
    }
    update(user) {
        let userNeed2Update = this._users.find((ele) => {
            ele._id == user._id;
        });
        if (!userNeed2Update)
            return null;
        userNeed2Update._name = user._name;
        userNeed2Update._address = user._address;
        userNeed2Update._birthday = user._birthday;
        this.updateFile();
        return userNeed2Update;
    }
    delete(id) {
        let index = this._users.findIndex((ele) => ele._id == id);
        if (index > -1) {
            let userDelete = this._users[index];
            this._users.splice(index, 1);
            this.updateFile();
            return userDelete;
        }
        return null;
    }
    updateFile() {
        fs.writeFileSync("src/mockjson/MOCK_DATA.json", JSON.stringify(this._users));
        console.log("update to json done");
    }
};
exports.UserRepository = UserRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], UserRepository);
exports.userRepository = new UserRepository();
