import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '/imports/ui/components/Navbar';

const Games = () => (
  <div>
    <Navbar />
    <h3>Games</h3>
    <Link to="/signup">Inscription</Link>
    <Link to="/signin">Connection</Link>
  </div>
);

export default Games;
