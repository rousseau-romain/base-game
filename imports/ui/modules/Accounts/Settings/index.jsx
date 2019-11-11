import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';

import { toast, ToastContainer } from 'react-toastify';

import Grid from '@material-ui/core/Grid';
import Navbar from '/imports/ui/components/Navbar';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from './Button';


const Settings = () => {
  const [userInfo, setUserInfo] = useState(undefined);

  const changeUserInfo = type => (event) => {
    setUserInfo({ ...userInfo, [type]: event.target.value });
  };

  const updateUserInfo = () => {
    Meteor.call('usersInfos.update', (userInfo), (err) => {
      if (err) toast.error(err.reason);
    });
  };

  useEffect(() => {
    Meteor.call('usersInfos.get', {}, (err, result) => {
      if (err) toast.error(err.reason);
      else setUserInfo(result);
      console.log(result);
    });
  }, []);

  return (
    <div>
      <ToastContainer />
      <Navbar pageName="Setting User" />


      {userInfo !== undefined && (
        <Container maxWidth="sm">

          <Grid container spacing={3} justify="flex-start" direction="row">
            <Grid item xs={6}>
              <TextField
                id="standard-username"
                label="Username"
                value={userInfo.username}
                onChange={changeUserInfo('username')}
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-email"
                label="Email"
                value={userInfo.email}
                onChange={changeUserInfo('email')}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Button updateUserInfo={updateUserInfo} />
            </Grid>

          </Grid>
        </Container>
      )}

    </div>
  );
};

export default Settings;
