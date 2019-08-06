import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Messages = new Mongo.Collection('messages');

const MessagesSchema = new SimpleSchema({
  roomId: {
    type: String,
  },
  userId: {
    type: String,
  },
  message: {
    type: String,
    max: 255,
  },
  createdAt: {
    type: String,
  },
});

Messages.attachSchema(MessagesSchema);

export default Messages;
