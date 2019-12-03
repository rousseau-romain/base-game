import { Meteor } from 'meteor/meteor';
import Messages from '..';
import Users from '../../users';

Meteor.publish('messages.get', (roomId) => {
  return Messages.find({ roomId }, {
    sort: { createdAt: 1 },
    limit: 200,
  });
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
});
