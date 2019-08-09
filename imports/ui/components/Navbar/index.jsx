import React, { useState, useCallback } from 'react';
import Header from './Header';
import Sidenav from './SideNav';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHeader = useCallback(() => {
    if (isOpen === true) setIsOpen(false);
    else setIsOpen(true);
  }, [isOpen]);
  return (
    <div>
      <Sidenav isOpen={isOpen} />
      <Header toggleHeader={toggleHeader} />
    </div>
  );
};

export default NavBar;
