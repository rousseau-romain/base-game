import { Meteor } from 'meteor/meteor';

Meteor.publish(null, () => (
  Meteor.users.find(Meteor.userId(), {
    fields: {
      dateOfBirth: 1,
      city: 1,
      gender: 1,
    },
    limit: 1,
  })
));
