import React, { useContext } from 'react';
import Header from './Header';
import Sidenav from './SideNav';
import { AppContext } from '/imports/ui/context';

const NavBar = ({ pageName }) => {
  const { pageName: title, setPageName } = useContext(AppContext);
  setPageName(pageName);

  return (
    <div>
      <Sidenav isOpen={false} pageName={title} />
      <div style={{ height: '56px' }}>
        <Header />
      </div>
    </div>
  );
};

export default NavBar;
