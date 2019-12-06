import React, {
  Fragment, useCallback, forwardRef, useState, useEffect,
} from 'react';

import colorFromString from '/imports/utils/colorFromString';

import { Meteor } from 'meteor/meteor';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import AvatarName from '/imports/ui/components/AvatarName';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  typographyName: {
    marginRight: '10px',
  },
  inline: {
    display: 'inline',
    marginRight: '10px',
  },
  listItemAvatar: {
    position: 'relative',
    top: '-20%',
  },
});

const User = forwardRef(({
  userId, message, createdAt,
}, ref) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    Meteor.call('users.getOne', userId, (err, result) => {
      if (!err) setUser(result);
    });
  }, [userId]);

  const classes = useStyles();

  const displayItemImage = useCallback(() => (
    user !== undefined
      ? <AvatarName color={colorFromString(user._id)} username={user.username} />
      : <div />
  ),
  [user]);

  return (
    <ListItem ref={ref}>
      <ListItemAvatar className={classes.listItemAvatar}>
        {displayItemImage()}
      </ListItemAvatar>
      {/* <Typography variant="caption" className={classes.typographyName}>
        {user.username}
      </Typography> */}
      <ListItemText
        secondary={message}
        primary={(
          <Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {user !== undefined ? user.username : ''}
            </Typography>
            {createdAt}
          </Fragment>
        )}
      />
      {/* <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="write-message"
        >
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction> */}
    </ListItem>
  );
});

export default User;
