import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';

import { toast, ToastContainer } from 'react-toastify';

import { GENDERS } from '/imports/utils/constants';
import formatDate from '/imports/utils/formatDate';
import toCapitalize from '/imports/utils/toCapitalize';

import Navbar from '/imports/ui/components/Navbar';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from './Button';

const Settings = () => {
  const [userInfo, setUserInfo] = useState(undefined);

  const changeUserInfo = type => (event) => {
    setUserInfo({ ...userInfo, [type]: event.target.value });
  };

  const changeUserInfoDate = (dateOfBirth) => {
    setUserInfo({ ...userInfo, dateOfBirth });
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
    });
  }, []);
  return (
    <div>
      <ToastContainer position="bottom-right" />
      <Navbar pageName="Setting User" />
      {userInfo !== undefined && (
        <Container maxWidth="sm">
          <Grid alignItems="center" container spacing={3} justify="flex-start" direction="row">
            <Grid item xs={12}>
              <TextField
                id="standard-username"
                label="Username"
                value={userInfo.username}
                onChange={changeUserInfo('username')}
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-email"
                label="Email"
                value={userInfo.email}
                onChange={changeUserInfo('email')}
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-city"
                label="City"
                value={userInfo.city}
                onChange={changeUserInfo('city')}
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item xs={6} container>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  label="Date of birth"
                  clearable
                  value={userInfo.dateOfBirth}
                  placeholder={formatDate(userInfo.dateOfBirth) || formatDate(new Date())}
                  onChange={date => changeUserInfoDate(date)}
                  format="MM/dd/yyyy"
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="content-select-gender">Gender</InputLabel>
                <Select
                  label="Gender"
                  id="content-select"
                  value={userInfo.gender ? userInfo.gender : ''}
                  onChange={changeUserInfo('gender')}
                >
                  {Object.values(GENDERS).map(gender => (
                    <MenuItem
                      key={gender}
                      value={toCapitalize(gender)}
                    >
                      {toCapitalize(gender)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
