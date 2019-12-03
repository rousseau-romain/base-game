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
  createdAt: {
    type: String,
  },
});

Rooms.attachSchema(RoomsSchema);

export default Rooms;
