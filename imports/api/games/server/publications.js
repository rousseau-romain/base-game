import { Meteor } from 'meteor/meteor';
import Games from '..';

Meteor.publish('games.get', () => (
  Games.find({}, {
    sort: { createdAt: -1 },
    limit: 50,
    // skip: 50,
  })
));
