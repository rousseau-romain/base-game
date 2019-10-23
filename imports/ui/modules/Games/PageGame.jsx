import React, { useContext } from 'react';
import Navbar from '/imports/ui/components/Navbar';
import AddIcon from '@material-ui/icons/Add';
import AddButton from './AddButton';
import Game from './Game';

import { CardGameContext } from './context';

const PageGame = ({ history }) => {
  const { toggleCardGame } = useContext(CardGameContext);

  return (
    <div>
      <Navbar />
      <AddButton onClick={() => { toggleCardGame(); }}><AddIcon /></AddButton>
      <Game history={history} />
    </div>
  );
};

export default PageGame;
