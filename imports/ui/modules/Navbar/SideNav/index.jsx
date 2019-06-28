// import React from 'react';
import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

 const SwipeableTemporaryDrawer = (props) => {
  const classes = useStyles();
  const [left, setLeft] = useState(props.isOpen)
  
  const toggleSideNav = (isOpen) => event => {
    setLeft(isOpen)
  }

  return (
    <div> 
      <SwipeableDrawer
        open={left}
        onClose={toggleSideNav(false)}
        onOpen={toggleSideNav(true)}
      >
        <h3>zdsfzsfdf</h3>
      </SwipeableDrawer>
    </div>
  );
}

export default SwipeableTemporaryDrawer