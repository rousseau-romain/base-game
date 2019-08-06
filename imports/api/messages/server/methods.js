import { Meteor } from 'meteor/meteor';
import Messages from '..';

Meteor.methods({
  'messages.create': function ({ message, idRoom }) {
    if (!this.userId) {
      throw new Meteor.Error('403', 'You must be connected');
    }
    const room = Rooms.findOne(idRoom);
    if (!this.userId) {
      throw new Meteor.Error('403', 'You must be connected');
    }

    Messages.insert({
      userId: this.userId,
      idRoom,
      message,
      createdAt: new Date(),
    });
    return Messages.findOne({}, { sort: { createdAt: -1, limit: 1 } });
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

  'messages.remove': function (id) {
    if (!this.userId) {
      throw new Meteor.Error('403', 'You must be connected');
    }

    const room = Messages.findOne(id);

    if (room.userId !== this.userId) {
      throw new Meteor.Error('403', 'You must be the owner of room');
    }

    Messages.remove(id);
  },

  'messages.get': function () {
    const messages = Messages.find({}, {
      sort: { createdAt: -1 },
      limit: 50,
      // skip: 50,
    }).fetch();
    return messages;
  },

  'messages.last': function () {
    return Messages.findOne({}, {
      sort: { createdAt: -1, limit: 1 },
    });
  },

});
