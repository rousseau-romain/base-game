import React, {
  useState, useEffect,
} from 'react';

import { withRouter } from 'react-router-dom';

import Navbar from '/imports/ui/components/Navbar';
import AddIcon from '@material-ui/icons/Add';

import goToUrl from '/imports/utils/goToUrl';

import { Meteor } from 'meteor/meteor';

import { toast, ToastContainer } from 'react-toastify';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddButton from './AddButton';

function Game({ history }) {
  const [listGames, setListGames] = useState([]);

  const deleteGame = (id, e) => {
    e.stopPropagation();
    Meteor.call('games.remove', (id), (err) => {
      if (err) {
        toast.error(err.reason);
      } else {
        setListGames(listGames.filter(game => game._id !== id));
        toast.success('Game deleted');
      }
    });
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    Meteor.call('games.toggleFavorite', (id), (err) => {
      if (err) toast.error(err.reason);
      else {
        const newListGames = listGames.map((game) => {
          if (game._id === id) game.isFavorite = !game.isFavorite;
          return game;
        });
        setListGames(newListGames);
      }
    });
  };

  useEffect(() => {
    Meteor.call('games.get', {}, (err, result) => {
      if (err) toast.error(err.reason);
      else setListGames(result);
    });
  }, []);


  return (
    <div>
      <Navbar pageName="Page Games" />
      <ToastContainer />
      <List dense={false}>
        { listGames.map(value => (
          <ListItem
            key={value._id}
            onClick={() => goToUrl(history, `game/${value._id}`)}
          >
            <ListItemAvatar>
              <Avatar>
                {
                  value.imageUrl !== ''
                    ? (<Avatar alt="image game" src={value.imageUrl} />)
                    : (<FolderIcon />)
                }
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={value.name}
              secondary={null}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="favorite"
                onClick={(e) => {
                  toggleFavorite(value._id, e);
                }}
              >
                {
                  value.isFavorite
                    ? (<FavoriteIcon color="error" />)
                    : (<FavoriteIcon color="action" />)
                }
              </IconButton>
              <IconButton
                aria-label="edit"
                edge="end"
                onClick={() => goToUrl(history, `game/${value._id}`)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={(e) => { deleteGame(value._id, e); }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <AddButton onClick={() => { goToUrl(history, '/game/new'); }}>
        <AddIcon />
      </AddButton>
    </div>
  );
}

export default withRouter(Game);
