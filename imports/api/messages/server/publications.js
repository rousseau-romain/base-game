import { Meteor } from 'meteor/meteor';
import Messages from '..';

Meteor.publish('messages.get', (roomId) => {
  const messages = Messages.find({ roomId }, {
    sort: { createdAt: 1 },
    limit: 200,
  }).fetch();
  return messages;
});
