import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Rooms = new Mongo.Collection('rooms');

const RoomSchema = new SimpleSchema({
  userId: {
    type: String,
  },
  name: {
    type: String,
    max: 255,
  },
  createdAt: {
    type: String,
  },
});

Rooms.attachSchema(RoomSchema);

export default Rooms;
