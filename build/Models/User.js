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
        return { name: this._name, birthday: this._birthday, address: this._address, identity: "Xxxxxx" };
    }
}
exports.default = User;
