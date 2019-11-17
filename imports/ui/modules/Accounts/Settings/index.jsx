import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';

import { toast, ToastContainer } from 'react-toastify';

import { GENDERS } from '/imports/utils/constants';

import Grid from '@material-ui/core/Grid';
import Navbar from '/imports/ui/components/Navbar';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import SliderUi from '@material-ui/core/Slider';
import Button from './Button';

const Settings = () => {
  const [userInfo, setUserInfo] = useState(undefined);

  const changeUserInfo = type => (event) => {
    setUserInfo({ ...userInfo, [type]: event.target.value });
  };

  const changeUserInfoAge = (age) => {
    setUserInfo({ ...userInfo, age });
  };

  const updateUserInfo = () => {
    Meteor.call('usersInfos.update', (userInfo), (err) => {
      if (err) toast.error(err.reason);
    });
  };

  useEffect(() => {
    console.log('load');

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

          <Grid alignItems="center" container spacing={3} justify="flex-start" direction="row">
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
            <Grid item xs={10} container>
              <Typography id="discrete-slider" gutterBottom>
                Age
              </Typography>
              <SliderUi
                defaultValue={userInfo.age || 30}
                onChangeCommitted={(e, value) => { changeUserInfoAge(value); }}
                aria-labelledby="slider-age"
                valueLabelDisplay="auto"
                step={1}
                min={1}
                max={100}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl>
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
                      value={gender}
                    >
                      {gender}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-city"
                label="City"
                value={userInfo.city}
                onChange={changeUserInfo('city')}
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
