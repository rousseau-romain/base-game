import React, { useState, useCallback } from 'react';
import Header from './Header';
import Sidenav from './SideNav';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleHeader = useCallback(() => {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  }, [isOpen]);
  return (
    <div>
      <Sidenav isOpen={isOpen} />
      <Header toggleHeader={toggleHeader} />
    </div>
  );
};

export default NavBar;
