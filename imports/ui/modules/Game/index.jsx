import React, { useEffect, useState, Fragment } from 'react';
import Navbar from '/imports/ui/components/Navbar';
import { Meteor } from 'meteor/meteor';
import formatDate from '/imports/utils/formatDate';
import { toast } from 'react-toastify';

const Game = ({ match: { params: { gameId } } }) => {
  const [gameInfo, setGameInfo] = useState();

  useEffect(() => {
    Meteor.call('games.getOne', (gameId), (err, result) => {
      if (err) toast.error(err.reason);
      else setGameInfo(result);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <h1>testgame</h1>
      <p>{gameId}</p>
      {gameInfo !== undefined && (
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
