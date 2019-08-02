import { Meteor } from 'meteor/meteor';
import Rooms from '..';

Meteor.publish('rooms.get', () => (
  Rooms.find({}, {
    sort: { createdAt: -1 },
    limit: 50,
    // skip: 50,
  })
));
