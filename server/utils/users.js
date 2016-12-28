
// Sample user schema
// [{
//   id: '/#234234sdc',
//   name: 'Nathan',
//   room: 'Room Name'
// }]

// addUser(id, name, room)

// removeUser(id)

// getUser(id)

// getUserList(room)

class Users {
  constructor () {
    this.users = [];
  }

  addUser (id, name, room) {
    var user = {id, name, room};

    this.users.push(user);
    return user;
  }

  removeUser (id) {
    var user = this.getUser(id);

    if(user) {
      this.users = this.users.filter(user => user.id !== id);
    }

    return user;
  }

  getUser (id) {
    return this.users.filter(user => user.id === id)[0];
  }

  getUserList (room) {
    // return an array of the user names that are in the room passed in
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
}


module.exports = { Users };

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }

//   getUserDescription () {
//     return `${this.name} is ${this.age} years old`
//   }
// }

// var me = new Person('Nathan', 32);

// console.log(me.getUserDescription())