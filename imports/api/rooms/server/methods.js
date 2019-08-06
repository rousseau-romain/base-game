import { Meteor } from 'meteor/meteor';
import Rooms from '..';

Meteor.methods({
  'rooms.create': function (name) {
    if (!this.userId) {
      throw new Meteor.Error('403', 'You must be connected');
    }

    Rooms.insert({
      name,
      userId: this.userId,
      createdAt: new Date(),
    });
    return Rooms.findOne({}, { sort: { createdAt: -1, limit: 1 } });
  },

  'rooms.update': function ({ id, name }) {
    if (!this.userId) {
      throw new Meteor.Error('403', 'You must be connected');
    }

    const room = Rooms.findOne(id);

    if (room.userId !== this.userId) {
      throw new Meteor.Error('403', 'You must be the owner of room');
    }

    Rooms.update(id, { $set: { name } });
  },

  'rooms.remove': function (id) {
    if (!this.userId) {
      throw new Meteor.Error('403', 'You must be connected');
    }

    const room = Rooms.findOne(id);

    if (room.userId !== this.userId) {
      throw new Meteor.Error('403', 'You must be the owner of room');
    }

    Rooms.remove(id);
  },

  'rooms.get': function () {
    const rooms = Rooms.find({}, {
      sort: { createdAt: -1 },
      limit: 50,
      // skip: 50,
    }).fetch();
    return rooms;
  },

  'room.getOne': function (id) {
    return Rooms.findOne(id);
  },


  'rooms.last': function () {
    return Rooms.findOne({}, {
      sort: { createdAt: -1, limit: 1 },
    });
  },

});
