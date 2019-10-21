import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Games = new Mongo.Collection('games');

const GameSchema = new SimpleSchema({
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

Games.attachSchema(GameSchema);

export default Games;
