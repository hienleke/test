"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.departmentRepository = exports.DepartmentRepository = void 0;
const type_1 = require("../Types/type");
const inversify_1 = require("inversify");
const userSchema_1 = __importDefault(require("../Models/sequelize/userSchema"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let DepartmentRepository = exports.DepartmentRepository = class DepartmentRepository {
    constructor() { }
    findAll(type) {
        return __awaiter(this, void 0, void 0, function* () {
            //
            let departNeed2find;
            if (type == type_1.TYPE_ORM.sequelize) {
                departNeed2find = yield userSchema_1.default.findAll();
            }
            else if (type == type_1.TYPE_ORM.prisma) {
                departNeed2find = yield prisma.department.findMany({
                    select: {
                        id: true,
                        name: true,
                        users: {
                            select: {
                                name: true,
                            },
                        },
                    },
                });
                console.log("🚀 ~ file: DepartmentRepository.ts:31 ~ DepartmentRepository ~ findAll ~ departNeed2find:", departNeed2find);
                // console.log("🚀 ~ file: UserRepository.ts:56 ~ UserRepository ~ findbyIDdepartment ~ userNeed2find:", userNeed2find);
            }
            return departNeed2find ? departNeed2find : null;
        });
    }
};
exports.DepartmentRepository = DepartmentRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], DepartmentRepository);
exports.departmentRepository = new DepartmentRepository();
