import { Meteor } from 'meteor/meteor';
import Messages from '..';
import Rooms from '../../rooms';
import Users from '../../users';

Meteor.methods({
  'messages.create': function ({ roomId, message }) {
    if (!this.userId) throw new Meteor.Error('403', 'You must be connected');

    const room = Rooms.findOne(roomId);

    if (!room) throw new Meteor.Error('403', 'Use a valid Id room');

    return Messages.insert({
      userId: this.userId,
      roomId,
      message,
      createdAt: new Date(),
    });
    // return Messages.findOne({}, { sort: { createdAt: -1, limit: 1 } });
  },

  // 'messages.update': function ({ id, message }) {
  //   if (!this.userId) {
  //     throw new Meteor.Error('403', 'You must be connected');
  //   }

  //   const room = Messages.findOne(id);

  //   if (room.userId !== this.userId) {
  //     throw new Meteor.Error('403', 'You must be the owner of room');
  //   }

  //   Messages.update(id, { $set: { message } });
  // },

  // 'messages.remove': function (id) {
  //   if (!this.userId) {
  //     throw new Meteor.Error('403', 'You must be connected');
  //   }

  //   const room = Messages.findOne(id);

  //   if (room.userId !== this.userId) {
  //     throw new Meteor.Error('403', 'You must be the owner of room');
  //   }

  //   Messages.remove(id);
  // },

  'messages.get': function (roomId) {
    const messages = Messages.find({ roomId }, {
      sort: { createdAt: 1 },
      limit: 50,
    }).fetch();
    messages.map((message) => {
      const user = Users.findOne(message.userId, {
        fields: {
          _id: 1, emails: 1, username: 1,
        },
      });
      message.user = user;
      message.user.email = message.user.emails[0].address;
      // delete message.user.services;
      delete message.user.emails;
      delete message.userId;
      return message;
    });
    return messages;
  },

  'messages.last': function () {
    return Messages.findOne({}, {
      sort: { createdAt: -1, limit: 1 },
    });
  },

});
