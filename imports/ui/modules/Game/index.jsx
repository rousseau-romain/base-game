import React, { useEffect, useState, Fragment } from 'react';
import Navbar from '/imports/ui/components/Navbar';
import { Meteor } from 'meteor/meteor';
import formatDate from '/imports/utils/formatDate';
import { toast } from 'react-toastify';

const Game = ({ match: { params: { gameId } } }) => {
  const [gameInfo, setGameInfo] = useState();
  const [gameInfoIsLoad, setGameInfoIsLoad] = useState(false);

  useEffect(() => {
    Meteor.call('games.getOne', (gameId), (err, result) => {
      if (err) toast.error(err.reason);
      else {
        console.log(result);

        setGameInfo(result);
        setGameInfoIsLoad(true);
      }
    });
  }, []);

  return (
    <div>
      <Navbar />
      <h1>testgame</h1>
      <p>{gameId}</p>
      {gameInfoIsLoad && (
        <Fragment>
          <input type="text" value={gameInfo._id._str} />
          <input type="text" value={gameInfo.name} />
          <input type="text" value={formatDate(gameInfo.createdAt)} />
          <input type="text" value={gameInfo.paragraph} />
          <input type="text" value={gameInfo.imageUrl} />
        </Fragment>
      )}
    </div>
  );
};

export default Game;
