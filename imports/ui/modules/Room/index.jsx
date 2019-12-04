import React, {
  useState, useEffect, useMemo,
} from 'react';

import { toast, ToastContainer } from 'react-toastify';

import moment from 'moment';

import { Meteor } from 'meteor/meteor';

import Messages from '/imports/api/messages';
import Users from '/imports/api/users';

import { withTracker } from 'meteor/react-meteor-data';

import { makeStyles } from '@material-ui/core/styles';

import Navbar from '/imports/ui/components/Navbar';

import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';

import Message from './Message';

import InputMessage from './InputMessage';

const useStyles = makeStyles(() => ({
  list: { marginBottom: '56px' },
  circularProgress: {
    position: 'fixed',
    transform: 'transform: scale(0.5) translate(-50%, -50%)',
    top: '50%',
    left: '50%',
  },
}));

const Room = ({ match: { params: { roomId } }, loading, messages }) => {
  const classes = useStyles();

  const displayMessages = useMemo(() => messages.map(value => (
    <Message
      id={value._id}
      key={value._id}
      user={value.user}
      message={value.message}
      createdAt={moment(value.createdAt).format('lll')}
    />
  )), [messages]);

  console.log(messages[messages.length - 1]);

  return (
    <div>
      <Navbar pageName="Room Message" />
      <ToastContainer position="bottom-right" />
      <List dense={false} className={classes.list}>
        {
          loading
            ? displayMessages
            : <CircularProgress className={classes.circularProgress} />
        }
      </List>
      <InputMessage roomId={roomId} />
    </div>
  );
};

export default withTracker(({ match: { params: { roomId } } }) => {
  const messagesSubscribe = Meteor.subscribe('messages.get', roomId);
  const loading = messagesSubscribe.ready();
  let messages = Messages.find({ roomId }).fetch();
  messages = messages.map((message) => {
    const user = Users.findOne(message.userId, {
      fields: {
        _id: 1, emails: 1, username: 1,
      },
    });
    message.user = user;
    message.user.email = message.user.emails[0].address;
    delete message.roomId;
    delete message.user.emails;
    delete message.userId;
    return message;
  });
  return { loading, messages };
})(Room);
