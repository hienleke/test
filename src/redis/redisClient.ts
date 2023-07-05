import { createClient } from "redis";

const client = createClient({
     password: "ARHkxFn5vQ6Jin0cpBh6nvx8098NVEsW",
     socket: {
          host: "redis-16624.c290.ap-northeast-1-2.ec2.cloud.redislabs.com",
          port: 16624,
     },
});

async function connectRDB() {
     client.on("ready", () => {
          console.log("Connected redis!");
     });
     client.on("error", (err) => {
          console.error(err);
     });
     return await client.connect();
}

export { connectRDB, client as RDB };
