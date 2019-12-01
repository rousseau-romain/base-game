import React, { useCallback, useEffect, useState } from 'react';

import { Meteor } from 'meteor/meteor';

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
  const [idRoom, setIdRoom] = useState(undefined);

  const style = { backgroundColor: colorFromString(id) };

  const goUser = useCallback(() => { history.push(`user/${id}`); }, [history, id]);

  const goMessageUser = useCallback((e) => {
    e.stopPropagation();
    if (idRoom === undefined) {
      Meteor.call('rooms.create', ([id]), (err, result) => {
        if (err) console.log(err);
        else history.push(`room/${result}`);
      });
    } else history.push(`room/${idRoom._id}`);
  }, [history, id, idRoom]);


  useEffect(() => {
    Meteor.call('rooms.getByIdUsers', ([id]), (err, result) => {
      if (err) console.log(err);
      else setIdRoom(result.length === 0 ? undefined : result[0]);
    });
  }, [id]);

  const displayItemImage = useCallback(() => (
    <Avatar style={style}>
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
          onClick={goMessageUser}
        >
          <MessageIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default User;
