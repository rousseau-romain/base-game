import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Games from '..';

Meteor.methods({
  'games.create': function ({name, paragraph, isFavorite, imageUrl}) {
    if (!this.userId) {
      throw new Meteor.Error('403', 'You must be connected');
    }

    Games.insert({
      userId: this.userId,
      name,
      paragraph,
      isFavorite,
      createdAt: new Date(),
      imageUrl,
    });
    return Games.findOne({}, { sort: { createdAt: -1, limit: 1 } });
  },

  'games.update': function ({
    id, name, isFavorite, paragraph, imageUrl,
  }) {
    if (!this.userId) {
      throw new Meteor.Error('403', 'You must be connected');
    }

    const game = Games.findOne(id);

    if (game.userId !== this.userId) {
      throw new Meteor.Error('403', 'You must be the owner of game');
    }
    const test = Games.update(id, {
      $set: {
        name, isFavorite, paragraph, imageUrl,
      },
    });
    return test;
  },

  'games.remove': function (id) {
    if (!this.userId) {
      throw new Meteor.Error('403', 'You must be connected');
    }

    const room = Games.findOne(id);

    if (room.userId !== this.userId) {
      throw new Meteor.Error('403', 'You must be the owner of room');
    }

    Games.remove(id);
  },
  'games.toggleFavorite': function (id) {
    if (!this.userId) {
      throw new Meteor.Error('403', 'You must be connected');
    }

    const game = Games.findOne(id);

    if (game.userId !== this.userId) {
      throw new Meteor.Error('403', 'You must be the owner of game');
    }
    Games.update(id, {
      $set: {
         isFavorite: !game.isFavorite,
      },
    });
    return Games.findOne(id);
  },

  'games.get': function () {
    const games = Games.find({ userId: this.userId }, {
      sort: { createdAt: -1 },
      limit: 50,
      // skip: 50,
    }).fetch();
    return games;
  },

  'games.getOne': function (id) {
    return Games.findOne(id);
  },


  'games.last': function () {
    return Games.findOne({}, {
      sort: { createdAt: -1, limit: 1 },
    });
  },

});
