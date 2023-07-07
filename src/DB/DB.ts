import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
     dialect: "postgres",
     host: "localhost",
     username: "postgres",
     port: 5435,
     password: "postgres",
     database: "test",
     logging: false,
     define: {
          timestamps: false,
     },
});
async function connectDB() {
     await sequelize.sync();
     sequelize
          .authenticate()
          .then(() => {
               console.log("Connection PostgreSQL by Sequelize has been established successfully.");
          })
          .catch((err) => {
               console.error("Unable to connect to the database PostgreSQL by Sequelize:", err);
          });
}

export { sequelize, connectDB };
