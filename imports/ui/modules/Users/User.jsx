import React, { useCallback } from 'react';

import colorFromString from '/imports/utils/colorFromString';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MessageIcon from '@material-ui/icons/Message';


import Avatar from '@material-ui/core/Avatar';

const User = ({
  history, id, username, email,
}) => {
  const style = { backgroundColor: colorFromString(id) };

  const goUser = useCallback(() => { history.push(`user/${id}`); }, [history, id]);

  const displayItemImage = useCallback(() => (
    <Avatar style={style} variant="rounded">
      {username.charAt(0)}
    </Avatar>
  ),
  [style, username]);


  return (
    <ListItem onClick={goUser}>
      <ListItemAvatar>
        <Avatar>
          {displayItemImage()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={username}
        secondary={email}
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="write-message"
        >
          <MessageIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default User;
