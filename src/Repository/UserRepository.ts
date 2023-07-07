import { departmentRepository } from "./DepartmentRepository";
import { TYPE_ORM } from "./../Types/type";
import * as fs from "fs";
import { User } from "../Models/User";
import { injectable } from "inversify";
import moment from "moment";
import userSchema from "../Models/sequelize/userSchema";
import { PrismaClient, Prisma } from "@prisma/client";
import DepartmentSchema from "../Models/sequelize/departmentSchema";
import { Transaction } from "sequelize";
import { sequelize } from "../DB/DB";

const prisma = new PrismaClient({
     log: [
          {
               emit: "event",
               level: "query",
          },
          {
               emit: "stdout",
               level: "error",
          },
          {
               emit: "stdout",
               level: "info",
          },
          {
               emit: "stdout",
               level: "warn",
          },
     ],
});

prisma.$on("query", (e) => {
     console.log("Query: " + e.query);
     console.log("Params: " + e.params);
     // console.log("Duration: " + e.duration + "ms");
});

@injectable()
export class UserRepository {
     _users: User[] = [];
     constructor() {
          let jsonString = fs.readFileSync("src/mockjson/MOCK_DATA.json");
          let jsonData = JSON.parse(jsonString.toString());
          for (let ele of jsonData) {
               this._users.push(new User(ele._id, ele._name, new Date(ele._birthday), ele._address));
          }
     }
     async findAll(type): Promise<User[] | null> {
          //
          let userNeed2find;
          if (type == TYPE_ORM.sequelize) {
               userNeed2find = await userSchema.findAll();
          } else if (type == TYPE_ORM.prisma) {
               userNeed2find = await prisma.user.findMany({
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
     }

     async findUserWithAge(age: number, type: TYPE_ORM) {
          let userNeed2find;
          // let date = moment().subtract(20, "year").toDate();
          if (type == TYPE_ORM.sequelize) {
               await sequelize.transaction({}, async (t) => {
                    let data = await sequelize.query(`select * from public.getusermorethanage(${age})`);
                    userNeed2find = data;
                    console.log(" data :", data);
                    console.log("🚀 ~ file: UserRepository.ts:83 ~ UserRepository ~ awaitsequelize.transaction ~ userNeed2find:", userNeed2find);
               });
          } else if (type == TYPE_ORM.prisma) {
               const [user] = await prisma.$transaction([prisma.$queryRaw`select * from public.getusermorethanage(${age})`]);

               userNeed2find = user;
          }
          return userNeed2find ? userNeed2find : null;
     }
     async findbyID(id: number, type: TYPE_ORM): Promise<User | null> {
          //
          let userNeed2find;
          if (type == TYPE_ORM.sequelize) {
               userNeed2find = await userSchema.findByPk(id);
          } else if (type == TYPE_ORM.prisma) {
               userNeed2find = await prisma.user.findUnique({
                    where: {
                         id: id,
                    },
               });
          }
          return userNeed2find ? userNeed2find : null;
     }
     async findbyIDdepartment(id: number, type: TYPE_ORM): Promise<User | null> {
          let userNeed2find;
          if (type == TYPE_ORM.sequelize) {
               userNeed2find = await userSchema.findByPk(id);
          } else if (type == TYPE_ORM.prisma) {
               userNeed2find = await prisma.department.findUnique({
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
     }
     async create(user: User, type: TYPE_ORM): Promise<User | null> {
          let newUser;

          if (type == TYPE_ORM.sequelize) {
               newUser = await userSchema.create(user.toObject());
          } else if (type == TYPE_ORM.prisma) {
               newUser = await prisma.user.create({ data: user.toObject() });
               console.log("🚀 ~ file: UserRepository.ts:43 ~ UserRepository ~ create ~ newUser:", newUser);
          }
          return newUser ? user : null;
     }

     update(user: User): User | null {
          let userNeed2Update = this._users.find((ele) => {
               ele._id == user._id;
          });
          if (!userNeed2Update) return null;
          userNeed2Update._name = user._name;
          userNeed2Update._address = user._address;
          userNeed2Update._birthday = user._birthday;
          this.updateFile();
          return userNeed2Update;
     }

     delete(id: number): User | null {
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
}

export const userRepository = new UserRepository();
