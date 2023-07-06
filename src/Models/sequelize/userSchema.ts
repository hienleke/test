import { sequelize } from "../../DB/DB";
import { DataTypes } from "sequelize";
const userSchema = sequelize.define("User", {
     id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          primaryKey: true,
     },
     name: {
          type: DataTypes.TEXT,
     },
     address: {
          type: DataTypes.TEXT,
     },
     birthday: {
          type: DataTypes.DATE,
     },
});

export default userSchema;
