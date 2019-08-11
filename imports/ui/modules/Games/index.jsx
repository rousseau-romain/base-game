import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '/imports/ui/components/Navbar';
import AddIcon from '@material-ui/icons/Add';
import AddButton from './AddButton';
import NewGame from './NewGame';


const Games = () => (
  <div>
    <Navbar />
    <h3>Games</h3>
    <Link to="/signup">Inscription</Link>
    <Link to="/signin">Connection</Link>
    <AddButton><AddIcon /></AddButton>
    <NewGame />
  </div>
);

export default Games;
