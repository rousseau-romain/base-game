import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GamesIcon from '@material-ui/icons/Games';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';

const MenuList = () => (
  <List
    component="nav"
    aria-labelledby="list-sidenav"
    subheader={(
      <ListSubheader component="div" id="list-sidenav">
          Nested List Items
      </ListSubheader>
    )}
  >
    <ListItem button>
      <ListItemIcon>
        <GamesIcon />
      </ListItemIcon>
      <ListItemText primary="Games" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <VideogameAssetIcon />
      </ListItemIcon>
      <ListItemText primary="Consoles" />
    </ListItem>
  </List>
);

export default MenuList;
