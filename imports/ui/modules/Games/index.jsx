import React, {
  useState, useContext, useEffect,
} from 'react';

import { withRouter } from 'react-router-dom';

import Navbar from '/imports/ui/components/Navbar';
import AddButton from './AddButton';
import AddIcon from '@material-ui/icons/Add';


import formatDate from '/imports/utils/formatDate';
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

function Game({ history }) {

  const [listGames, setListGames] = useState([]);

  const deleteGame = (id) => { console.log(`delete: ${id}`); };
  const toggleFavorite = (id, key) => {
    Meteor.call('games.toggleFavorite', (id), (err, response) => {
      if (err) toast.error(err.reason);
      else {
        const newListGames= listGames;
        newListGames[key]=response
        setListGames(newListGames)
      }
    });

  };
  const updateGame = (id) => {
    Meteor.call('games.update', ({
      id,
      name: cardGameInfo.name,
      isFavorite: cardGameInfo.isFavorite,
      paragraph: cardGameInfo.paragraph,
      imageUrl: cardGameInfo.imageUrl,
    }), (err, result) => {
      if (err) toast.error(err.reason);
      else console.log(result);
    });
  };

  useEffect(() => {
    Meteor.call('games.get', {}, (err, result) => {
      if (err) toast.error(err.reason);
      else {setListGames(result);console.log(result[0]._id);
      }
    });
  }, []);


  return (
    <div>
    <Navbar />
      <ToastContainer />
      <List dense={false}>
        { listGames.map((value, key) => (
          <ListItem
            key={value._id}
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
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
                onClick={() => {
                  toggleFavorite(value._id, key)
                }}
              >
                {value.isFavorite ? 
                (<FavoriteIcon color="error"/>) : 
                (<FavoriteIcon color="action"/>)}
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
                onClick={() => {deleteGame(value._id)}}
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
