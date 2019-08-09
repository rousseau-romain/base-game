import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '/imports/ui/components/Navbar';

const Landing = () => (
  <div>
    <Navbar />
    <h3>Landing</h3>
    <Link to="/signup">Inscription</Link>
    <Link to="/signin">Connection</Link>
  </div>
);

export default Landing;
