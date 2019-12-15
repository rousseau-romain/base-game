import React, {
  useState, useEffect, useMemo,
} from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { Meteor } from 'meteor/meteor';

import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import Navbar from '/imports/ui/components/Navbar';

import List from '@material-ui/core/List';

import User from './User';

const useStyles = makeStyles(() => ({
  list: { marginBottom: '56px' },
}));

const Users = ({ history }) => {
  const classes = useStyles();

  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    Meteor.call('users.get', {}, (err, result) => {
      if (err) toast.error(err.reason);
      else setListUsers(result);
    });
  }, []);

  const displayUsers = useMemo(() => listUsers.map(value => (
    <User
      history={history}
      id={value._id}
      key={value._id}
      username={value.username}
      email={value.email}
    />
  )), [history, listUsers]);

  return (
    <div>
      <Navbar />
      <ToastContainer position="bottom-right" />
      <List dense={false} className={classes.list}>
        {displayUsers}
      </List>
    </div>
  );
};

export default withRouter(Users);
