import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '/imports/ui/components/Navbar';
import AddIcon from '@material-ui/icons/Add';
import AddButton from './AddButton';
import Game from './Game';

import { CardGameContext } from './context';

const PageGame = () => {
  const { toggleCardGame } = useContext(CardGameContext);

  return (
    <div>
      <Navbar />
      <h3>Games</h3>
      <Link to="/signup">Inscription</Link>
      <Link to="/signin">Connection</Link>
      <AddButton onClick={() => { toggleCardGame(); }}><AddIcon /></AddButton>
      <Game />
    </div>
  );
};

export default PageGame;
