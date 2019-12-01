import { Meteor } from 'meteor/meteor';
import Rooms from '..';

Meteor.methods({
  'rooms.create': function (usersId) {
    if (!this.userId) throw new Meteor.Error('403', 'You must be connected');
    console.log(usersId);

    usersId.push(this.userId);

    if (!usersId.find(userId => userId === this.userId)) throw new Meteor.Error('403', "You can't create rooms");

    return Rooms.insert({
      usersId,
      createdAt: new Date(),
      messages: [],
    });
  },
  'rooms.addMessage': function ({ roomId, userId, message }) {
    if (!this.userId) throw new Meteor.Error('403', 'You must be connected');

    if (!userId === this.userId) throw new Meteor.Error('403', "You can't add message");

    Rooms.update({ _id: roomId }, {
      $push: {
        messages: {
          message, userId,
        },
      },
    });
  },
  'rooms.getById': function (roomId) {
    return Rooms.findOne(roomId);
  },
  'rooms.getByIdUsers': async function (usersId) {
    if (!this.userId) throw new Meteor.Error('403', 'You must be connected');
    usersId.push(this.userId);
    return Rooms.rawCollection().aggregate(
      [
        {
          $match: {
            usersId,
          },
        },
      ],
    ).toArray();
  },
});
