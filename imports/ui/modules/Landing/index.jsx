import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div>
    <h3>Landing</h3>
    <Link to="/signup">Inscription</Link>
    <Link to="/signin">Connection</Link>
  </div>
);

export default Landing;
