import React, { useState, useContext, useEffect } from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import { SidebarContext } from '/imports/ui/context';
import MenuList from '../MenuList';

const SwipeableTemporaryDrawer = ({ children }) => {
  // ToFix: useEffect trigger toggle sidenav so isOpen change instant true -> false
  const [isOpen, setIsOpen] = useState(true);

  const { sidebarIsOpen } = useContext(SidebarContext);

  const toggleSideNav = () => setIsOpen(!isOpen);

  useEffect(() => toggleSideNav(), [sidebarIsOpen]);

  return (
    <div>
      <SwipeableDrawer
        open={isOpen}
        onClose={() => { toggleSideNav(); }}
        onOpen={() => {}}
      >
        <MenuList />
        {children}
      </SwipeableDrawer>
    </div>
  );
};

export default SwipeableTemporaryDrawer;