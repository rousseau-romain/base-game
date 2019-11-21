import React, { useCallback } from 'react';

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

const ItemGame = ({
  history, id, imageUrl, isFavorite, name, toggleFavorite, deleteGame,
}) => {
  const goUrl = useCallback(() => { history.push(`game/${id}`); }, [history, id]);

  const displayItemImage = useCallback(() => {
    if (imageUrl !== '') return (<Avatar alt="image game" src={imageUrl} />);
    return (<FolderIcon />);
  }, [imageUrl]);

  const displayItemFavorite = useCallback(() => {
    if (isFavorite) return (<FavoriteIcon color="error" />);
    return (<FavoriteIcon color="action" />);
  }, [isFavorite]);

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          {displayItemImage()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={null}
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="favorite"
          onClick={e => toggleFavorite(id, e)}
        >
          {displayItemFavorite()}
        </IconButton>
        <IconButton
          edge="end"
          aria-label="edit"
          onClick={goUrl}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={e => deleteGame(id, e)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ItemGame;
