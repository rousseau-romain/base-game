import React, { useState, useContext, useEffect } from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import { SidebarContext } from "/imports/ui/context";

const SwipeableTemporaryDrawer = ({children}) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const { sidebarIsOpen } = useContext(SidebarContext);

  useEffect(() => toggleSideNav(), [sidebarIsOpen],);

  const toggleSideNav = () => setIsOpen(!isOpen);

  return (
    <div> 
      <SwipeableDrawer
        open={isOpen} 
        onClose={()=>{toggleSideNav()}}
        onOpen={()=>{}}
      >
        <h3>zdsfzsfdf</h3>
        {children}
      </SwipeableDrawer>
    </div>
  );
}

export default SwipeableTemporaryDrawer