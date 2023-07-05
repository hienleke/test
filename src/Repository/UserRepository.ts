import * as fs from "fs";
//import { injectable } from "inversify";
import User from "../Models/User";
import { injectable } from "inversify";
import { TYPE_ORM } from "../Types/type";
import userSchema from "../Models/userSchema";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

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
     findAll(): User[] {
          //
          return this._users;
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
               console.log("🚀 ~ file: UserRepository.ts:37 ~ UserRepository ~ findbyID ~ userNeed2find:", userNeed2find);
          }
          return userNeed2find ? userNeed2find : null;
     }
     async findbyIDdepartment(id: number, type: TYPE_ORM): Promise<User | null> {
          //
          let userNeed2find;

          if (type == TYPE_ORM.sequelize) {
               userNeed2find = await userSchema.findByPk(id);
          } else if (type == TYPE_ORM.prisma) {
               userNeed2find = await prisma.depatment.findUnique({
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
          //
     }

     updateFile() {
          fs.writeFileSync("src/mockjson/MOCK_DATA.json", JSON.stringify(this._users));
          console.log("update to json done");
     }
}

export const userRepository = new UserRepository();
