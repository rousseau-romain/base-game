import { Meteor } from 'meteor/meteor';
import Rooms from '..';
import Users from '../../users';

Meteor.methods({
  'rooms.create': function (usersId) {
    if (!this.userId) throw new Meteor.Error('403', 'You must be connected');

    usersId.push(this.userId);

    if (!usersId.find(userId => userId === this.userId)) throw new Meteor.Error('403', "You can't create rooms");

    return Rooms.insert({
      usersId,
      createdAt: new Date(),
    });
  },
  'rooms.getById': function (roomId) {
    return Rooms.findOne(roomId);
  },
  'rooms.getByIdUsers': function (usersId) {
    if (!this.userId) throw new Meteor.Error('403', 'You must be connected');
    usersId.push(this.userId);
    return Rooms.find({ usersId: { $all: usersId } }).fetch();
  },
  'rooms.getByIdUsers.userInfo': function (usersId) {
    if (!this.userId) throw new Meteor.Error('403', 'You must be connected');
    usersId.push(this.userId);
    const rooms = Rooms.find({ usersId: { $all: usersId } }).fetch();
    return rooms.map((r) => {
      const users = Users.find({}, {}).fetch();
      const user = users.find(u => u._id === r.usersId.find(i => i !== this.userId));
      user.email = user.emails[0].address;
      delete user.emails;
      return { ...r, userInfo: user };
    });
  },
});
