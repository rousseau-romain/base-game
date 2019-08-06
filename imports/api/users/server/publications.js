import { Meteor } from 'meteor/meteor';

Meteor.publish(null, () => (
  Meteor.users.find(Meteor.userId(), {
    fields: {
      age: 1,
      city: 1,
      gender: 1,
    },
    limit: 1,
  })
));
