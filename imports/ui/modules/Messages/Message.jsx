import React, { useCallback } from 'react';

import colorFromString from '/imports/utils/colorFromString';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MessageIcon from '@material-ui/icons/Message';

import AvatarName from '/imports/ui/components/AvatarName';

const Message = ({
  history, id, username, email,
}) => {
  const goUser = useCallback(() => { history.push(`user/${id}`); }, [history, id]);

  const goMessageUser = useCallback((e) => {
    e.stopPropagation();
    history.push(`room/${id}`);
  }, [history, id]);

  const displayItemImage = useCallback(() => (
    <AvatarName color={colorFromString(id)} username={username} />
  ),
  [id, username]);

  return (
    <ListItem>
      <ListItemAvatar>
        {displayItemImage()}
      </ListItemAvatar>
      <ListItemText
        primary={username}
        secondary={email}
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="write-message"
          onClick={goMessageUser}
        >
          <MessageIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Message;
