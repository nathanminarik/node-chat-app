const expect = require('expect');
const { Users } = require('./Users');

describe('Users', () => {
  
  var users;
  beforeEach(() => {
    users = new Users();
    
    users.users = [{
      id: 1,
      name: 'Nathan',
      room: 'Room Name'
    },{
      id: 2,
      name: 'Mike',
      room: 'Test Name'
    },{
      id: 3,
      name: 'Jen',
      room: 'Room Name'
    }]
  })
  
  it('should add new User', () => {
    var users = new Users();
    var user = {
      id: 123,
      name: 'Nathan',
      room: 'Room Name'
    }

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var userId = 1

    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user with an invalid id', () => {
    var userId = 99

    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    var user = users.getUser(1);

    expect(user).toEqual(users.users[0]);
  });

  it('should not find a user with an invalid id', () => {
    var user = users.getUser(4);

    // expect(user).toBe(undefined);
    expect(user).toNotExist();
  });

  it('should return names for Room Name', () => {
    var usersList = users.getUserList('Room Name');

    expect(usersList).toEqual(['Nathan', 'Jen']);
  });
  
  it('should return names for Test Name', () => {
    var usersList = users.getUserList('Test Name');

    expect(usersList).toEqual(['Mike']);
  });

});