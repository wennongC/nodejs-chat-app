// [{
//   id: 'socket id',
//   name: 'name',
//   room: 'room'
// }];

class Users{
  constructor(){
    this.users = [];
  }

  addUser(id, name, room){
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser(id){
    var user = this.getUser(id);
    if(user){
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }

  getUser(id){
    return this.users.filter((user) => user.id === id )[0];
  }

  duplicateNameCheck(name){
    if((this.users.filter((user) => user.name == name)).length===0){
      return true;
    }else{
      return false;
    }
  }

  getUserList(room){
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);
    return namesArray;
  }

  getRoomList(){
    var seen = {};
    var rooms = this.users.map((user) => user.room);
    return rooms.filter((room) => {
      return seen.hasOwnProperty(room) ? false : (seen[room] = true);
    });
  }
}

module.exports = {Users};
