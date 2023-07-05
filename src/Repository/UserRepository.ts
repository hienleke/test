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
     findbyID(id: number): User | null {
          //
          let userNeed2find = this._users.find((ele) => {
               return ele._id == id;
          });
          if (!userNeed2find) return null;
          return userNeed2find;
     }

     async create(user: User, type: TYPE_ORM): Promise<User | null> {
          let newUser;

          if (type == TYPE_ORM.sequelize) {
               newUser = await userSchema.create(user.toObject());
          } else if (type == TYPE_ORM.prisma) {
               newUser = await prisma.user.create({
                    data: user.toObject(),
               });
               console.log("🚀 ~ file: UserRepository.ts:43 ~ UserRepository ~ create ~ newUser:", newUser);
          }
          console.log(" new user :", newUser);
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
