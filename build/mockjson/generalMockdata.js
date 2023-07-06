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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const client_1 = require("@prisma/client");
const _ = require("lodash");
const prisma = new client_1.PrismaClient();
let departmentRaw = fs.readFileSync("./MOCK_DATA _Deparment.json");
let usersRaw = fs.readFileSync("./MOCK_DATA _User.json");
let departments = JSON.parse(departmentRaw.toString());
let users = JSON.parse(usersRaw.toString());
users = [...users];
departments = [...departments];
Promise.all(departments.map((ele) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.department.create({
        data: {
            name: ele.name,
        },
    });
}))).then((data) => {
    console.log(" data out : ", data);
});
/* Promise.all(
     users.map(async (ele) => {
          let random = _.random(0, departments.length - 1);
          let tempDepartments = departments.splice(0, random);
          await prisma.user.create({
               data: {
                    name: ele.name,
                    birthday: ele.birthday,
                    address: ele.address,
                    departments: {
                         connectOrCreate: tempDepartments.map((ele) => ({
                              where: {
                                   name: ele.name,
                              },
                              create: {
                                   name: ele.name,
                              },
                         })),
                    },
               },
          });
     })
);

*/
