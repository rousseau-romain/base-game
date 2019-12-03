import React, {
  useState, useEffect, useMemo,
} from 'react';

import { toast, ToastContainer } from 'react-toastify';

import moment from 'moment';

import { Meteor } from 'meteor/meteor';

import Messages from '/imports/api/messages';

import { withTracker } from 'meteor/react-meteor-data';

import { makeStyles } from '@material-ui/core/styles';

import Navbar from '/imports/ui/components/Navbar';

import List from '@material-ui/core/List';

import Message from './Message';

import InputMessage from './InputMessage';

import { Promise } from 'meteor/promise';


const useStyles = makeStyles(() => ({
  list: { marginBottom: '56px' },
}));

const Room = (props) => {
  const classes = useStyles();
  // console.log(props);

  const { match: { params: { roomId } }, loading, messages } = props;
  const [listMessages, setListMessages] = useState([]);

  useEffect(() => {
    Meteor.call('messages.get', (roomId), (err, result) => {
      if (err) toast.error(err);
      else setListMessages(result);
    });
  }, [roomId]);

  const displayMessages = useMemo(() => listMessages.reverse().map(value => (
    <Message
      id={value._id}
      key={value._id}
      user={value.user}
      message={value.message}
      createdAt={moment(value.createdAt).format('lll')}
    />
  )), [listMessages]);
  console.log(loading, messages);

  return (
    <div>
      <Navbar pageName="Room Message" />
      <ToastContainer position="bottom-right" />
      <List dense={false} className={classes.list}>
        {displayMessages}
      </List>
      <InputMessage roomId={roomId} />
    </div>
  );
};

const callWithPromise = (method, ...myParameters) => new Promise((resolve, reject) => {
  Meteor.call(method, ...myParameters, (error, result) => {
    if (error) reject(error);
    resolve(result);
  });
});

export default withTracker(({ match: { params: { roomId } } }) => {
  const messagesSubscribe = Meteor.subscribe('messages.get', roomId);
  const loading = !messagesSubscribe.ready();
  const messages = callWithPromise('messages.get', roomId);

  // console.log({ loading, messages, messagesSubscribe });
  return { loading: 'fgh', messages };
})(Room);
