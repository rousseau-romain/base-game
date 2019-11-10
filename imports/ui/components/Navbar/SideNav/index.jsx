import React, { useState, useContext, useEffect } from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import { AppContext } from '/imports/ui/context';
import MenuList from '../MenuList';

const SwipeableTemporaryDrawer = ({ children, pageName }) => {
  // ToFix: useEffect trigger toggle sidenav so isOpen change instant true -> false
  const [isOpen, setIsOpen] = useState(true);

  const { sidebarIsOpen } = useContext(AppContext);

  const toggleSideNav = () => setIsOpen(!isOpen);

  useEffect(() => toggleSideNav(), [sidebarIsOpen]);

  return (
    <div>
      <SwipeableDrawer
        open={isOpen}
        onClose={() => { toggleSideNav(); }}
        onOpen={() => {}}
      >
        <MenuList title={pageName} />
        {children}
      </SwipeableDrawer>
    </div>
  );
};

export default SwipeableTemporaryDrawer;
