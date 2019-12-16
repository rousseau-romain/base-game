import { Meteor } from 'meteor/meteor';
import axios from 'axios';

const headers = { 'user-key': 'e39930b616d6487493aab68c5f754595' };
Meteor.methods({

  'api.games.getByName': async function (name) {
    let r;
    await axios('https://api-v3.igdb.com/games', {
      headers,
      data: `fields *;where name = *"${name}"*;`,
    })
      .then((result) => {
        r = result.data;
      })
      .catch(e => console.log(e));

    return r;
  },

  'api.games.getImageById': async function (id) {
    let r;
    await axios('https://api-v3.igdb.com/covers', {
      headers,
      data: `fields *;where game = ${id};`,
    })
      .then((result) => {
        r = result.data;
      })
      .catch(e => console.log(e));

    return r;
  },
});
