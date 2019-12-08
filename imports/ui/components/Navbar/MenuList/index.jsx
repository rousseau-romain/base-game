import React, { useContext } from 'react';
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
import SettingsIcon from '@material-ui/icons/Settings';
import { AppContext } from '/imports/ui/context';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({
  expansionPanel: {
    marginTop: '0px !important',
    borderRadius: '0px !important',
  },
  expansionPanelDetails: {
    padding: '0px !important',
  },
}));


const MenuList = ({ history, title }) => {
  const { toggleSidebar } = useContext(AppContext);

  const classes = useStyles();

  return (
    <List
      component="nav"
      aria-labelledby="list-pages"
      subheader={(
        <ListSubheader component="div" id="list-sidenav">
          {title === undefined ? ('Menu List') : (title)}
        </ListSubheader>
      )}
    >
      <ListItem button onClick={() => { history.push('/games'); toggleSidebar(); }}>
        <ListItemIcon>
          <GamesIcon />
        </ListItemIcon>
        <ListItemText primary="Games" />
      </ListItem>
      <ListItem button onClick={() => { history.push('/consoles'); toggleSidebar(); }}>
        <ListItemIcon>
          <VideogameAssetIcon />
        </ListItemIcon>
        <ListItemText primary="Consoles" />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => { history.push('/users'); toggleSidebar(); }}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => { history.push('/settings'); toggleSidebar(); }}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
      <Divider />
      <ExpansionPanel className={classes.expansionPanel}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Search</Typography>
        </ExpansionPanelSummary>
        <Divider />
        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
          <ListItem button onClick={() => { history.push('/search/games'); toggleSidebar(); }}>
            <ListItemIcon>
              <GamesIcon />
            </ListItemIcon>
            <ListItemText primary="Games" />
          </ListItem>
        </ExpansionPanelDetails>
      </ExpansionPanel>

    </List>
  );
};
export default withRouter(MenuList);
