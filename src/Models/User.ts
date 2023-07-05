class User {
     _id: number;
     _birthday: Date;
     _name: string;
     _address: string;

     constructor(id: number, name: string, birthday: Date, address: string) {
          this._id = id ? id : -1;
          this._name = name;
          this._birthday = birthday;
          this._address = address;
     }

     toObject() {
          return { name: this._name, address: this._address, birthday: this._birthday, departmentId: 1 };
     }
}
export default User;
