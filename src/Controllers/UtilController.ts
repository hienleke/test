import * as express from "express";
import { BaseHttpController, controller, httpGet, request, response } from "inversify-express-utils";

@controller("/util")
export class UtilController extends BaseHttpController {
     constructor() {
          super();
     }

     @httpGet("/getnumdaysincurrentmonth")
     public async getDays(@request() req: express.Request, @response() res: express.Response) {
          const currentDate = new Date();
          let daysincurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
          res.json(daysincurrentMonth.getDate());
     }
     @httpGet("/getcurrentdayinweek")
     public async getDayinWeek(@request() req: express.Request, @response() res: express.Response) {
          const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          const currentDate = new Date();
          let day = weekday[currentDate.getDay()];
          res.json(day);
     }
}
