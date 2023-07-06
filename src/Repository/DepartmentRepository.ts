import { TYPE_ORM } from "../Types/type";
import * as fs from "fs";
import { User, Department } from "../Models/User";
import { injectable } from "inversify";
import moment from "moment";
import userSchema from "../Models/sequelize/userSchema";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

@injectable()
export class DepartmentRepository {
     constructor() {}
     async findAll(type): Promise<User[] | null> {
          //
          let departNeed2find;
          if (type == TYPE_ORM.sequelize) {
               departNeed2find = await userSchema.findAll();
          } else if (type == TYPE_ORM.prisma) {
               departNeed2find = await prisma.department.findMany({
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
               // console.log("🚀 ~ file: UserRepository.ts:56 ~ UserRepository ~ findbyIDdepartment ~ userNeed2find:", userNeed2find);
          }
          return departNeed2find ? departNeed2find : null;
     }

     // async create(user: User, type: TYPE_ORM): Promise<User | null> {
     //      let newUser;

     //      if (type == TYPE_ORM.sequelize) {
     //           newUser = await userSchema.create(user.toObject());
     //      } else if (type == TYPE_ORM.prisma) {
     //           newUser = await prisma.user.create({ data: user.toObject() });
     //           console.log("🚀 ~ file: UserRepository.ts:43 ~ UserRepository ~ create ~ newUser:", newUser);
     //      }
     //      return newUser ? user : null;
     // }

     // update(user: User): User | null {
     //      let userNeed2Update = this._users.find((ele) => {
     //           ele._id == user._id;
     //      });
     //      if (!userNeed2Update) return null;
     //      userNeed2Update._name = user._name;
     //      userNeed2Update._address = user._address;
     //      userNeed2Update._birthday = user._birthday;
     //      this.updateFile();
     //      return userNeed2Update;
     // }

     // delete(id: number): User | null {
     //      let index = this._users.findIndex((ele) => ele._id == id);
     //      if (index > -1) {
     //           let userDelete = this._users[index];
     //           this._users.splice(index, 1);
     //           this.updateFile();
     //           return userDelete;
     //      }
     //      return null;
     // }
}

export const departmentRepository = new DepartmentRepository();
