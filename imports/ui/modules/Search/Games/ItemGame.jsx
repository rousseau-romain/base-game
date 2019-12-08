import React, { useCallback } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import GamesIcon from '@material-ui/icons/Games';

import Avatar from '@material-ui/core/Avatar';

const ItemGame = ({
  history, id, imageUrl, name,
}) => {
  const goGame = useCallback(() => { history.push(`/game/${id}`); }, [history, id]);

  const displayItemImage = useCallback(() => {
    if (imageUrl !== '') return (<Avatar alt="image game" src={imageUrl} />);
    return (<GamesIcon />);
  }, [imageUrl]);

  return (
    <ListItem onClick={goGame}>
      <ListItemAvatar>
        <Avatar>
          {displayItemImage()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={null}
      />
    </ListItem>
  );
};

export default ItemGame;
