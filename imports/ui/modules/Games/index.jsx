import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '/imports/ui/components/Navbar';
import AddIcon from '@material-ui/icons/Add';
import AddButton from './AddButton';
import NewGame from './NewGame';

import { CardGameContext } from './context';

const Games = () => {
  const { cardGameIsOpen } = useContext(CardGameContext);
  const { toggleCardGame } = useContext(CardGameContext);

  console.log(typeof (cardGameIsOpen), cardGameIsOpen);


  return (
    <div>
      <Navbar />
      <h3>Games</h3>
      <Link to="/signup">Inscription</Link>
      <Link to="/signin">Connection</Link>
      <AddButton onClick={() => { console.log('dfdfg'); toggleCardGame(); }}><AddIcon /></AddButton>
      <NewGame />
    </div>
  );
};

export default Games;
