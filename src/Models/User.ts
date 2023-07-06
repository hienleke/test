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

class Department {
     _id: number;
     _name: string;

     constructor(id: number, name: string, birthday: Date, address: string) {
          this._id = id ? id : -1;
          this._name = name;
     }
}
export { User, Department };
