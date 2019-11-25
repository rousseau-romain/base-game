import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Meteor } from 'meteor/meteor';


import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withRouter } from 'react-router-dom';

import { AppContext } from '/imports/ui/context';
import MenuList from '../MenuList';

const useStyles = makeStyles(() => ({
  button: {
    zIndex: 10,
    top: 0,
    right: 0,
    position: 'absolute',
    height: '48px',
    minWidth: '48px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
}));

const SwipeableTemporaryDrawer = ({
  history, children, pageName, isOpen,
}) => {
  const { sidebarIsOpen, toggleSidebar } = useContext(AppContext);
  if (isOpen) toggleSidebar();

  const logout = async () => Meteor.logout();

  const classes = useStyles();
  return (
    <SwipeableDrawer
      open={sidebarIsOpen || false}
      onClose={() => { toggleSidebar(); }}
      onOpen={() => {}}
    >
      <Button
        className={classes.button}
        onClick={() => {
          logout();
          setTimeout(() => {
            history.push('/signin');
            toggleSidebar();
          }, 500);
        }}
      >
        <ExitToAppIcon />
      </Button>
      <MenuList title={pageName} />

      {children}
    </SwipeableDrawer>
  );
};

export default withRouter(SwipeableTemporaryDrawer);
