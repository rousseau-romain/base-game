import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withRouter } from 'react-router-dom';

import { AppContext } from '/imports/ui/context';
import MenuList from '../MenuList';

const useStyles = makeStyles(() => ({
  button: {
    top: 0,
    right: 0,
    position: 'absolute',
    height: '48px',
    cursor: 'pointer',
    backgroundColor: 'red',
    zIndex: 10,
  },
}));

const SwipeableTemporaryDrawer = ({
  history, children, pageName, isOpen,
}) => {
  const { sidebarIsOpen, toggleSidebar } = useContext(AppContext);
  if (isOpen) toggleSidebar();

  const classes = useStyles();
  return (
    <SwipeableDrawer
      open={sidebarIsOpen || false}
      onClose={() => { toggleSidebar(); }}
      onOpen={() => {}}
    >
      <Button
        className={classes.button}
        onClick={() => { history.push('/settings'); toggleSidebar(); }}
      >
        <ExitToAppIcon />
      </Button>
      <MenuList title={pageName} />

      {children}
    </SwipeableDrawer>
  );
};

export default withRouter(SwipeableTemporaryDrawer);
