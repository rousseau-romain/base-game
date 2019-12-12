import React, { useEffect, useState, useCallback } from 'react';
import { Meteor } from 'meteor/meteor';

import colors from '/imports/utils/colors';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MessageIcon from '@material-ui/icons/Message';
import CallIcon from '@material-ui/icons/Call';

const useStyles = makeStyles({
  botomNavigation: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    borderTop: `1px solid ${colors('primary.base')}`,
    boxShadow: '0px -5px 10px -10px rgba(0,0,0,0.75)',
  },
  buttonNav: {
    color: colors('primary.base'),
  },
});

// eslint-disable-next-line no-unused-vars
const BottomNav = ({ history, userId, gameId }) => {
  const classes = useStyles();

  const [idRoom, setIdRoom] = useState(undefined);
  const [userInfo, setUserInfo] = useState(undefined);

  const goMessageUser = useCallback(() => {
    if (idRoom === undefined) {
      Meteor.call('rooms.create', ([userId]), (err, result) => {
        if (err) console.log(err);
        else history.push(`/room/${result}`);
      });
    } else history.push(`/room/${idRoom._id}`);
  }, [history, idRoom, userId]);

  useEffect(() => {
    Meteor.call('rooms.getByIdUsers', ([userId]), (err, result) => {
      if (err) console.log(err);
      else setIdRoom(result.length === 0 ? undefined : result[0]);
    });
    Meteor.call('users.getOne', (userId), (err, result) => {
      if (err) console.log(err);
      else setUserInfo(result);
    });
  }, [userId]);

  const buttonCall = () => {
    if (userInfo) {
      console.log(userInfo);
      if (userInfo.number) {
        return <BottomNavigationAction href={`tel:[${userInfo.number}]`} className={classes.buttonNav} label="Call" icon={<CallIcon />} />;
      }
    }
    return {};
  };

  return (
    <div>
      <div style={{ height: '57px' }} />
      <BottomNavigation className={classes.botomNavigation}>
        {buttonCall}
        <BottomNavigationAction className={classes.buttonNav} label="Message" icon={<MessageIcon />} onClick={goMessageUser} />
      </BottomNavigation>
    </div>
  );
};

export default BottomNav;
