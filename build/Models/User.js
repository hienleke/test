"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Department = exports.User = void 0;
class User {
    constructor(id, name, birthday, address) {
        this._id = id ? id : -1;
        this._name = name;
        this._birthday = birthday;
        this._address = address;
    }
    toObject() {
        //let rand;
        return {
            name: this._name,
            address: this._address,
            birthday: this._birthday,
            // departments: {
            //      create: [{ name: "That one time with the stuff" }, { name: "The story of planet Earth" }],
            // },
        };
    }
}
exports.User = User;
class Department {
    constructor(id, name, birthday, address) {
        this._id = id ? id : -1;
        this._name = name;
    }
}
exports.Department = Department;
