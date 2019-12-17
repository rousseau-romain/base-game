import React from 'react';
import Header from './Header';
import Sidenav from './SideNav';

const NavBar = ({ searchIsOpen }) => (
  <div>
    <Sidenav isOpen={false} />
    <div style={{ height: '56px' }}>
      <Header searchIsOpen={searchIsOpen} />
    </div>
  </div>
);

export default NavBar;
