import { sequelize } from "../../DB/DB";
import { DataTypes } from "sequelize";

const DepartmentSchema = sequelize.define("Department", {
     id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          primaryKey: true,
     },
     name: {
          type: DataTypes.TEXT,
     },
});

export default DepartmentSchema;
