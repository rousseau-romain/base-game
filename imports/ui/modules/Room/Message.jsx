import React, { Fragment, useCallback, forwardRef } from 'react';

import colorFromString from '/imports/utils/colorFromString';

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
  user, message, createdAt,
}, ref) => {
  const classes = useStyles();

  const displayItemImage = useCallback(() => (
    <AvatarName color={colorFromString(user._id)} username={user.username} />
  ),
  [user._id, user.username]);

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
              {user.username}
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
