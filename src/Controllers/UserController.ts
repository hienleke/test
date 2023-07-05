import { MulterRequest, upload } from "../Middleware/uploadMiddleware";
import { UserRepository } from "./../Repository/UserRepository";
import * as express from "express";
import { BaseHttpController, controller, httpGet, httpPost, httpDelete, request, httpPut, response, JsonContent } from "inversify-express-utils";
import User from "../Models/User";
import { inject } from "inversify";
import { RDB } from "../redis/redisClient";
import { Container } from "inversify";
import { UtilHelper } from "../util/UtilHelper";
import * as fs from "fs";
import path = require("path");

export function controllerFactory(container: Container) {
     @controller("/user")
     class UserController extends BaseHttpController {
          _container: Container;
          constructor(@inject("UserRepository") private _userRepository: UserRepository) {
               super();
               this._container = container;
          }

          @httpGet("/")
          public async get(@request() req: express.Request, @response() res: express.Response) {
               res.send(this._userRepository._users);
          }

          @httpGet("/:id")
          public async getuserbyid(@request() req: express.Request, @response() res: express.Response) {
               let { id } = req.params;
               let { type_orm } = req.body;
               let user = await this._userRepository.findbyID(Number(id), Number(type_orm));
               if (user) {
                    res.json(user);
               } else res.json("not found");
          }

          @httpGet("/getbydepartment/:id")
          public async getuserbyidDeparment(@request() req: express.Request, @response() res: express.Response) {
               let { id } = req.params;
               let { type_orm } = req.body;
               let user = await this._userRepository.findbyIDdepartment(Number(id), type_orm);
               if (user) {
                    res.json(user);
               } else res.json("not found");
          }
          @httpGet("/cache/:id")
          public async getuserfromredis(@request() req: express.Request, @response() res: express.Response) {
               let { id } = req.params;
               let { type_orm } = req.body;
               let data = await RDB.get(id);
               console.log("Data  out :", data?.toString());
               if (!data) {
                    let user = await this._userRepository.findbyID(Number(id), Number(type_orm));
                    if (user) {
                         res.json(user);
                         await RDB.set(id, JSON.stringify(user));
                    } else res.json("not found");
               } else {
                    console.log(" get data from cached");
                    res.json(JSON.parse(data));
               }
          }
          @httpGet("/getsEX123")
          public async getUserName(@request() req: express.Request, @response() res: express.Response) {
               let map = this._userRepository._users.map((ele) => {
                    // let name = UtilHelper.toNonAccentVietnamese(ele._name);
                    let arr: string[] = ele._name.split(" ");
                    let returnname = "";
                    for (let i = 0; i < arr.length - 1; i++) {
                         returnname += arr[i].charAt(0);
                    }
                    return UtilHelper.toNonAccentVietnamese(arr[arr.length - 1]) + "." + returnname;
               });

               const currentDate = new Date();
               let daysincurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
               const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
               let day = weekday[currentDate.getDay()];
               res.json({ listnameshort: map, dayinweek: day, numdaysinMonth: daysincurrentMonth.getDate() });
          }

          @httpPost("/")
          public async post(@request() req: express.Request, @response() res: express.Response) {
               let { name, address, birthday, type_orm } = req.body;
               let _birthday = new Date(birthday);
               let user = new User(-1, name, _birthday ? _birthday : new Date(), address);

               let data = await this._userRepository.create(user, type_orm);
               if (data) res.json(data);
               else res.json("unsuccessfully");
          }
          @httpDelete("/:id")
          public async delete(@request() req: express.Request, @response() res: express.Response) {
               let { id } = req.params;
               let data = this._userRepository.delete(Number(id));

               if (data) res.json(data);
               else res.json("unsuccessfully");
          }

          @httpPut("/")
          public async update(@request() req: express.Request, @response() res: express.Response) {
               let { id, name, address, birthday } = req.body;
               let _birthday = new Date(birthday);
               let user = new User(Number(id), name, _birthday ? _birthday : new Date(), address);
               let data = this._userRepository.update(user);
               if (data) res.json(data);
               else console.error("err :", data);
               res.json("unsuccessfully");
          }

          @httpGet("/resize/:imageName")
          public async resizeImage(@request() req: express.Request, @response() res: express.Response) {
               let { imageName } = req.params;
               let { width, height } = req.query;
               let pathfile = path.join(__dirname, "../../public/image/" + imageName);
               let pathdirector = path.join(__dirname, "../../public/image/");

               console.log(" path director : ", pathdirector);
               console.log(" path file : ", pathfile);
               console.log(" image name : ", imageName);

               if (fs.existsSync(pathfile)) {
                    console.log(" righ path");
                    UtilHelper.resize(Number(width), Number(height), pathdirector, pathfile, imageName);
               } else {
                    res.json("invalid image");
               }
          }
          @httpPost("/uploadImage", upload.single("recfile"))
          public async uploadImage(@request() req: MulterRequest, @response() res: express.Response) {
               console.log("image name :", req.file.path, req.file.mime);

               res.json({ file: req.file.name });
          }
     }
}
