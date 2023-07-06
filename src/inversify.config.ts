import "reflect-metadata";
import { AsyncContainerModule } from "inversify";
import "./Controllers/UserController";
import "./Controllers/UserController";
import { UserRepository } from "./Repository/UserRepository";
import { DepartmentRepository } from "./Repository/DepartmentRepository";
import { connectRDB } from "./redis/redisClient";
import { connectDB } from "./DB/DB";

export const bindings = new AsyncContainerModule(async (bind) => {
     await connectRDB();
     await connectDB();
});
