import React, {
  useEffect, useState,
} from 'react';
import { Meteor } from 'meteor/meteor';

import arrayParamsGame from '/imports/utils/arrayParams';

import Navbar from '/imports/ui/components/Navbar';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { toast, ToastContainer } from 'react-toastify';
import Button from './Button';


const Game = ({ match: { params: { gameId } } }) => {
  const [gameInfo, setGameInfo] = useState(undefined);

  useEffect(() => {
    if (gameId === 'new') {
      setGameInfo({
        name: 'New game',
        paragraph: 'Game paragraph',
        isFavorite: false,
        imageUrl: '',
        type: arrayParamsGame.type[0],
        content: arrayParamsGame.content[0],
        status: arrayParamsGame.status[0],
        state: arrayParamsGame.state[0],
      });
    } else {
      Meteor.call('games.getOne', (gameId), (err, result) => {
        if (err) toast.error(err.reason);
        else setGameInfo(result);
      });
    }
  }, []);

  const changeGameInfo = type => (event) => {
    setGameInfo({ ...gameInfo, [type]: event.target.value });
  };

  const updateGameInfo = () => {
    Meteor.call('games.update', {
      id: gameId,
      name: gameInfo.name,
      paragraph: gameInfo.paragraph,
      isFavorite: gameInfo.isFavorite,
      imageUrl: gameInfo.imageUrl,
      type: gameInfo.type,
      content: gameInfo.content,
      status: gameInfo.status,
      state: gameInfo.state,
    }, (err) => {
      if (err) toast.error(err.reason);
    });
  };
  const addNewGameInfo = () => {
    Meteor.call('games.create', {
      name: gameInfo.name,
      paragraph: gameInfo.paragraph,
      isFavorite: gameInfo.isFavorite,
      imageUrl: gameInfo.imageUrl,
      type: gameInfo.type,
      content: gameInfo.content,
      status: gameInfo.status,
      state: gameInfo.state,
    }, (err) => {
      if (err) toast.error(err.reason);
      else toast.success('Game added');
    });
  };

  return (
    <div>
      <ToastContainer />
      <Navbar />
      {gameInfo !== undefined && (
        <Container maxWidth="sm">
          <Grid container spacing={3} justify="center" direction="row">
            <Grid item xs={6}>
              <TextField
                id="standard-name"
                label="Name"
                value={gameInfo.name}
                onChange={changeGameInfo('name')}
                margin="normal"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                id="standard-multiline-flexible"
                label="Multiline"
                multiline
                rowsMax="4"
                value={gameInfo.paragraph}
                onChange={changeGameInfo('paragraph')}
                margin="normal"
              />
            </Grid> */}
            <Grid item xs={6}>
              <TextField
                id="standard-imageUrl"
                label="imageUrl"
                value={gameInfo.imageUrl}
                onChange={changeGameInfo('imageUrl')}
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel id="type-select-label">Type</InputLabel>
                <Select
                  id="type-select"
                  value={gameInfo.type}
                  onChange={changeGameInfo('type')}
                >
                  {arrayParamsGame.type.map(paramsGame => (
                    <MenuItem
                      key={paramsGame}
                      value={paramsGame}
                    >
                      {paramsGame}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                  id="status-select"
                  value={gameInfo.status}
                  onChange={changeGameInfo('status')}
                >
                  {arrayParamsGame.status.map(paramsGame => (
                    <MenuItem
                      key={paramsGame}
                      value={paramsGame}
                    >
                      {paramsGame}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel id="state-select-label">State</InputLabel>
                <Select
                  id="state-select"
                  value={gameInfo.state}
                  onChange={changeGameInfo('state')}
                >
                  {arrayParamsGame.state.map(paramsGame => (
                    <MenuItem
                      key={paramsGame}
                      value={paramsGame}
                    >
                      {paramsGame}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel id="content-select-label">Content</InputLabel>
                <Select
                  id="content-select"
                  value={gameInfo.content}
                  onChange={changeGameInfo('content')}
                >
                  {arrayParamsGame.content.map(paramsGame => (
                    <MenuItem
                      key={paramsGame}
                      value={paramsGame}
                    >
                      {paramsGame}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Button gameId={gameId} addNewGameInfo={addNewGameInfo} updateGameInfo={updateGameInfo} />
            </Grid>
          </Grid>
        </Container>
      )}

    </div>
  );
};

export default Game;
