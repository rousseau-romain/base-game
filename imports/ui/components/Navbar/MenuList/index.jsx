import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GamesIcon from '@material-ui/icons/Games';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import { withRouter } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import goToUrl from '/imports/utils/goToUrl';


const MenuList = ({ history }) => (
  <List
    component="nav"
    aria-labelledby="list-pages"
    subheader={(
      <ListSubheader component="div" id="list-sidenav">
          List pages
      </ListSubheader>
    )}
  >
    <ListItem button onClick={() => goToUrl(history, '/games')}>
      <ListItemIcon>
        <GamesIcon />
      </ListItemIcon>
      <ListItemText primary="Games" />
    </ListItem>
    <ListItem button onClick={() => goToUrl(history, '/consoles')}>
      <ListItemIcon>
        <VideogameAssetIcon />
      </ListItemIcon>
      <ListItemText primary="Consoles" />
    </ListItem>
    <Divider />
    <ListItem button onClick={() => goToUrl(history, '/settings')}>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
  </List>
);

export default withRouter(MenuList);
