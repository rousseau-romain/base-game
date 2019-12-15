import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Meteor } from 'meteor/meteor';


import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import { withRouter } from 'react-router-dom';

import { AppContext } from '/imports/ui/context';
import MenuList from '../MenuList';

const useStyles = makeStyles(() => ({
  button: {
    zIndex: 10,
    top: 0,
    right: 0,
    height: '48px',
    minWidth: '40px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  listButton: {
    position: 'absolute',
    right: 0,
  },
}));

const SwipeableTemporaryDrawer = ({
  history, children, isOpen,
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
      <div className={classes.listButton}>
        <Button
          className={classes.button}
          onClick={() => { history.push('/settings'); toggleSidebar(); }}
        >
          <SettingsIcon />
        </Button>
        <Button
          className={classes.button}
          onClick={() => {
            logout();
            setTimeout(() => {
              history.push('/signin');
              toggleSidebar();
            }, 150);
          }}
        >
          <ExitToAppIcon />
        </Button>
      </div>
      <MenuList />

      {children}
    </SwipeableDrawer>
  );
};

export default withRouter(SwipeableTemporaryDrawer);
