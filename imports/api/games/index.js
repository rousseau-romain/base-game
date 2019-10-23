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
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

Games.attachSchema(GameSchema);

export default Games;
