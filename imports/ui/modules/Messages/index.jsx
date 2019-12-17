import React, {
  useState, useEffect, useMemo,
} from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { Meteor } from 'meteor/meteor';

import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import Navbar from '/imports/ui/components/Navbar';

import List from '@material-ui/core/List';

import Message from './Message';

const useStyles = makeStyles(() => ({
  list: { marginBottom: '56px' },
}));

const Messages = ({ history }) => {
  const classes = useStyles();

  const [listMessage, setListMessage] = useState([]);

  useEffect(() => {
    Meteor.call('rooms.getByIdUsers.userInfo', ([]), (err, result) => {
      if (err) toast.error(err.reason);
      else setListMessage(result);
    });
  }, []);
  const displayMessage = useMemo(() => listMessage.map(value => (
    <Message
      history={history}
      id={value._id}
      key={value._id}
      username={value.userInfo.username}
      email={value.userInfo.email}
    />
  )), [history, listMessage]);

  console.log(listMessage);

  return (
    <div>
      <Navbar />
      <ToastContainer position="bottom-right" />
      <List dense={false} className={classes.list}>
        {displayMessage.length > 0 ? displayMessage : "U haven't any messages."}
      </List>
    </div>
  );
};

export default withRouter(Messages);
