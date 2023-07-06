import * as fs from "fs";
import { PrismaClient, Prisma } from "@prisma/client";
const _ = require("lodash");

const prisma = new PrismaClient();
let departmentRaw = fs.readFileSync("./MOCK_DATA _Deparment.json");
let usersRaw = fs.readFileSync("./MOCK_DATA _User.json");

let departments = JSON.parse(departmentRaw.toString());
let users = JSON.parse(usersRaw.toString());
users = [...users];
departments = [...departments];

Promise.all(
     departments.map(async (ele) => {
          await prisma.department.create({
               data: {
                    name: ele.name,
               },
          });
     })
).then((data) => {
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
