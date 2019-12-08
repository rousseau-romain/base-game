import React from 'react';
import Navbar from '/imports/ui/components/Navbar';

const Game = ({ match: { params: { gameId } } }) => {
  console.log(gameId);


  return (
    <div>
      <Navbar pageName="Page Game" isOpen />
      {gameId}
    </div>
  );
};

export default Game;
