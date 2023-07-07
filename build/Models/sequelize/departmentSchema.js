"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB/DB");
const sequelize_1 = require("sequelize");
const DepartmentSchema = DB_1.sequelize.define("Department", {
    id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.TEXT,
    },
});
exports.default = DepartmentSchema;
