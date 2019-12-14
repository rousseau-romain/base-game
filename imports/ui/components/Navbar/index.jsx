import React from 'react';
import Header from './Header';
import Sidenav from './SideNav';

const NavBar = () => (
  <div>
    <Sidenav isOpen={false} />
    <div style={{ height: '56px' }}>
      <Header />
    </div>
  </div>
);

export default NavBar;
