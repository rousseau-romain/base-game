import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GamesIcon from '@material-ui/icons/Games';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import PersonIcon from '@material-ui/icons/Person';
import { withRouter } from 'react-router-dom';

const MenuList = ({ history }) => {
  const goTo = (link) => { history.push(link); };

  return (
    <List
      component="nav"
      aria-labelledby="list-sidenav"
      subheader={(
        <ListSubheader component="div" id="list-sidenav">
          Nested List Items
        </ListSubheader>
      )}
    >
      <ListItem button onClick={() => { goTo('/games'); }}>
        <ListItemIcon>
          <GamesIcon />
        </ListItemIcon>
        <ListItemText primary="Games" />
      </ListItem>
      <ListItem button onClick={() => { goTo('/consoles'); }}>
        <ListItemIcon>
          <VideogameAssetIcon />
        </ListItemIcon>
        <ListItemText primary="Consoles" />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => { goTo('/settings'); }}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </List>
  );
};

export default withRouter(MenuList);
