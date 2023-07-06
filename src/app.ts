import { multer } from "multer";
import "reflect-metadata";
import { upload } from "./Middleware/uploadMiddleware";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { bindings } from "./inversify.config";
import { UserRepository } from "./Repository/UserRepository";
import { controllerFactory as UserFactory } from "./Controllers/UserController";
import { controllerFactory as DepartFactory } from "./Controllers/DepartmentController";
import * as dotenv from "dotenv";
import { DepartmentRepository } from "./Repository/DepartmentRepository";
let bodyParser = require("body-parser");

dotenv.config();

let container = new Container();
container.loadAsync(bindings);
container.bind<UserRepository>("UserRepository").to(UserRepository);
container.bind<DepartmentRepository>("DepartmentRepository").to(DepartmentRepository);
container.bind<multer>("upload").toConstantValue(upload);
DepartFactory(container);
UserFactory(container);

const server = new InversifyExpressServer(container);
server.setConfig((app) => {
     app.use(
          bodyParser.urlencoded({
               extended: true,
          })
     );
     app.use(bodyParser.json());
});
const app = server.build();

app.listen(3000);
