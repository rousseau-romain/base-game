import React, {
  useState, useEffect, useMemo,
} from 'react';

import { toast, ToastContainer } from 'react-toastify';

import moment from 'moment';

import { Meteor } from 'meteor/meteor';

import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import Navbar from '/imports/ui/components/Navbar';

import List from '@material-ui/core/List';

import Message from './Message';

import InputMessage from './InputMessage';


const useStyles = makeStyles(() => ({
  list: { marginBottom: '56px' },
}));

const Room = ({ match: { params: { roomId } } }) => {
  const classes = useStyles();

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

export default withRouter(Room);
