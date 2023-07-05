"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, name, birthday, address) {
        this._id = id ? id : -1;
        this._name = name;
        this._birthday = birthday;
        this._address = address;
    }
    toObject() {
        return { name: this._name, address: this._address, birthday: this._birthday, departmentId: 1 };
    }
}
exports.default = User;
