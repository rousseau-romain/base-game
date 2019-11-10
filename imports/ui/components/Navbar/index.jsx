import React, { useState, useCallback, useContext } from 'react';
import Header from './Header';
import Sidenav from './SideNav';
import { AppContext } from '/imports/ui/context';


const NavBar = ({ pageName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { pageName: title, setPageName } = useContext(AppContext);
  setPageName(pageName);
  const toggleHeader = useCallback(() => {
    if (isOpen === true) setIsOpen(false);
    else setIsOpen(true);
  }, [isOpen]);
  return (
    <div>
      <Sidenav isOpen={isOpen} pageName={title} />
      <Header toggleHeader={toggleHeader} />
    </div>
  );
};

export default NavBar;
