import React, { useEffect, useMemo, createRef } from 'react';

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
  list: { marginBottom: '22px' },
  circularProgress: {
    position: 'fixed',
    transform: 'transform: scale(0.5) translate(-50%, -50%)',
    top: '50%',
    left: '50%',
  },
}));

const Room = ({ match: { params: { roomId } }, loading, messages }) => {
  const classes = useStyles();

  const refs = messages.reduce((acc, value) => {
    acc[value._id] = createRef();
    return acc;
  }, {});

  const displayMessages = useMemo(() => messages.map(value => (
    <Message
      id={value._id}
      ref={refs[value._id]}
      key={value._id}
      message={value.message}
      userId={value.userId}
      createdAt={moment(value.createdAt).format('lll')}
    />
  )), [messages, refs]);

  useEffect(() => {
    if (messages.length > 0) {
      refs[messages[messages.length - 1]._id].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [messages, refs]);

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
  const messages = Messages.find({ roomId }).fetch();
  return { loading, messages };
})(Room);
