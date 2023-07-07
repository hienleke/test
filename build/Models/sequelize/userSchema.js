"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB/DB");
const sequelize_1 = require("sequelize");
const userSchema = DB_1.sequelize.define("User", {
    id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.TEXT,
    },
    address: {
        type: sequelize_1.DataTypes.TEXT,
    },
    birthday: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.default = userSchema;
