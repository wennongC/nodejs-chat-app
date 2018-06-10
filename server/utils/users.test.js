const expect = require('expect');
const {Users} = require('./users');

describe('Users Class', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '001',
      name: 'Code:001',
      room: 'Area01'
    }, {
      id: '002',
      name: 'Code:002',
      room: 'Area13'
    }, {
      id: '016',
      name: 'Code:016',
      room: 'Area13'
    }];
  });

  it('should add a new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Wennong',
      room: 'Melbourne'
    };
    users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    users.removeUser('001');
    var shouldBe = [{
      id: '002',
      name: 'Code:002',
      room: 'Area13'
    }, {
      id: '016',
      name: 'Code:016',
      room: 'Area13'
    }];
    expect(users.users).toEqual(shouldBe);
  });
  it('should not remove a user', () => {
    users.removeUser('015');
    var shouldBe = [{
      id: '001',
      name: 'Code:001',
      room: 'Area01'
    }, {
      id: '002',
      name: 'Code:002',
      room: 'Area13'
    }, {
      id: '016',
      name: 'Code:016',
      room: 'Area13'
    }];
    expect(users.users).toEqual(shouldBe);
  });

  it('should find a user', () => {
    var user = {
      id: '002',
      name: 'Code:002',
      room: 'Area13'
    }
    expect(users.getUser('002')).toEqual(user);
  });
  it('should not find a user', () => {
    expect(users.getUser('015')).toBeFalsy();
  });

  it('should return names of Area13', () => {
    var userList = users.getUserList('Area13');
    expect(userList).toEqual(['Code:002', 'Code:016']);
  });

  it('should not add duplicate user name', () => {
    expect(users.duplicateNameCheck('Code:001')).toBeFalsy();
    expect(users.duplicateNameCheck('Code:039')).toBe(true);
  });

  it('should return all DISTINCT room name', () => {
    expect(users.getRoomList().length).toBe(2);
  });
});
