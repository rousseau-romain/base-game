import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Games = new Mongo.Collection('games');

const GameSchema = new SimpleSchema({
  userId: {
    type: String,
  },
  name: {
    type: String,
    max: 50,
  },
  paragraph: {
    type: String,
    max: 500,
  },
  isFavorite: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
  },
  imageUrl: {
    type: String,
    max: 300,
  },
  type: {
    type: String,
    max: 50,
  },
  content: {
    type: String,
    max: 50,
  },
  status: {
    type: String,
    max: 50,
  },
  state: {
    type: String,
    max: 50,
  },
});

Games.attachSchema(GameSchema);

export default Games;
