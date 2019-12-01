import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Rooms = new Mongo.Collection('rooms');

const RoomsSchema = new SimpleSchema({
  usersId: {
    type: Array,
  },
  'usersId.$': {
    type: String,
  },
  messages: {
    type: Array,
    optional: true,
  },
  'messages.$': {
    type: Object,
  },
  'messages.$.message': {
    type: String,
    max: 255,
  },
  'messages.$.userId': {
    type: String,
  },
  createdAt: {
    type: String,
  },
});

Rooms.attachSchema(RoomsSchema);

export default Rooms;
