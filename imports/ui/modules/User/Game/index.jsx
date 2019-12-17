import React, {
  useEffect, useState, Fragment,
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import useDebounce from './useDebounce';
import { toast, ToastContainer } from 'react-toastify';
import Button from './Button';

const Game = ({ match: { params: { gameId } } }) => {
  const [gameInfo, setGameInfo] = useState(undefined);
  // const [gameList, setGameList] = useState(undefined);
  // const debouncedSearchTerm = useDebounce(gameInfo, 500);

  // useEffect(() => {
  //   if (debouncedSearchTerm) {
  //     Meteor.call('api.games.getByName', (gameInfo.name), (err, result) => {
  //       if (err) console.log(err.reason);
  //       else { setGameList(result); console.log(result); }
  //     });
  //   }
  // },
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // [debouncedSearchTerm]);


  useEffect(() => {
    if (gameId === 'new') {
      setGameInfo({
        name: '',
        paragraph: 'Game paragraph',
        isFavorite: false,
        imageUrl: '',
        type: arrayParamsGame.TYPE.ACTION_ADVENTURE,
        content: arrayParamsGame.CONTENT.FULL,
        status: arrayParamsGame.STATUS.NOT_STARTED,
        state: arrayParamsGame.STATE.NEW,
        isPublic: false,
        public: {},
      });
    } else {
      Meteor.call('games.getOne', (gameId), (err, result) => {
        if (err) toast.error(err.reason);
        else setGameInfo(result);
      });
    }
  }, [gameId]);

  const changeGameInfo = type => (event, value) => {
    switch (type) {
    case 'isPublic':
      setGameInfo({ ...gameInfo, [type]: event.target.checked });
      break;
    case 'quantity':
      setGameInfo({ ...gameInfo, [type]: value });
      break;
    // case 'name':
    //   if (value !== '' || gameInfo.name.length === 1) {
    //     setGameInfo({ ...gameInfo, [type]: value });
    //   }
    //   break;
    // case 'nameList':
    //   console.log('nl | ', gameList[event.target.value].name);
    //   setGameInfo({ ...gameInfo, name: gameList[event.target.value].name });
    //   Meteor.call('api.games.getImageById', (gameList[event.target.value].id), (err, result) => {
    //     if (err) console.log(err.reason);
    //     else { setTimeout(() => { setGameInfo({ ...gameInfo, imageUrl: result[0].url.substring(2) }); }, 100); }
    //   });
    //   break;
    default:
      setGameInfo({ ...gameInfo, [type]: event.target.value });
      break;
    }
  };

  const updateGameInfo = () => {
    Meteor.call('games.update', {
      id: gameId,
      ...gameInfo,
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
      isPublic: gameInfo.isPublic,
      public: gameInfo.public,
    }, (err) => {
      if (err) toast.error(err.reason);
      else toast.success('Game added');
    });
  };
  if (gameInfo) {
    // console.log(gameInfo.name);
  }

  return (
    <div>
      <ToastContainer position="bottom-right" />
      <Navbar />
      {gameInfo && (
        <Fragment>
          <Container maxWidth="sm">
            <Grid container spacing={3} justify="flex-start" direction="row">
              <Grid item xs={6}>
                {/* <Autocomplete
                  id="autocomplete"
                  freeSolo
                  options={gameList ? gameList.map(game => game.name) : []}
                  inputValue={gameInfo.name}
                  onInputChange={changeGameInfo('name')}
                  onClose={changeGameInfo('nameList')}
                  renderInput={params => ( */}
                <TextField
                  // {...params}
                  id="standard-name"
                  label="Name"
                  onChange={changeGameInfo('name')}
                  value={gameInfo.name}
                  fullWidth
                  margin="normal"
                />
                {/* )} */}
                {/* /> */}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="standard-imageUrl"
                  label="imageUrl"
                  value={gameInfo.imageUrl}
                  onChange={changeGameInfo('imageUrl')}
                  margin="normal"
                />
              </Grid>
              <Grid item xs="auto">
                <FormControl>
                  <InputLabel id="type-select-label">Type</InputLabel>
                  <Select
                    id="type-select"
                    value={gameInfo.type}
                    onChange={changeGameInfo('type')}
                  >
                    {Object.entries(arrayParamsGame.TYPE).map(paramsGame => (
                      <MenuItem
                        key={paramsGame[0]}
                        value={paramsGame[1]}
                      >
                        {paramsGame[1]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs="auto">
                <FormControl>
                  <InputLabel id="status-select-label">Status</InputLabel>
                  <Select
                    id="status-select"
                    value={gameInfo.status}
                    onChange={changeGameInfo('status')}
                  >
                    {Object.entries(arrayParamsGame.STATUS).map(paramsGame => (
                      <MenuItem
                        key={paramsGame[0]}
                        value={paramsGame[1]}
                      >
                        {paramsGame[1]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs="auto">
                <FormControl>
                  <InputLabel id="state-select-label">State</InputLabel>
                  <Select
                    id="state-select"
                    value={gameInfo.state}
                    onChange={changeGameInfo('state')}
                  >
                    {Object.entries(arrayParamsGame.STATE).map(paramsGame => (
                      <MenuItem
                        key={paramsGame[0]}
                        value={paramsGame[1]}
                      >
                        {paramsGame[1]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <InputLabel id="content-select-label">Content</InputLabel>
                  <Select
                    id="content-select"
                    value={gameInfo.content}
                    onChange={changeGameInfo('content')}
                  >
                    {Object.entries(arrayParamsGame.CONTENT).map(paramsGame => (
                      <MenuItem
                        key={paramsGame[0]}
                        value={paramsGame[1]}
                      >
                        {paramsGame[1]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="standard-multiline-flexible"
                  label="Paragraph"
                  multiline
                  rowsMax="4"
                  value={gameInfo.paragraph}
                  onChange={changeGameInfo('paragraph')}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Typography id="range-slider" gutterBottom>quantity</Typography>
                <Slider
                  defaultValue={gameInfo.quantity ? gameInfo.quantity : 0}
                  onChange={changeGameInfo('quantity')}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={(
                    <Switch
                      checked={gameInfo.isPublic}
                      onChange={changeGameInfo('isPublic')}
                      value={gameInfo.isPublic}
                      color="primary"
                    />
                  )}
                  label="Show on the public"
                />
              </Grid>
              {/* {gameInfo.isPublic && (
                <Fragment>
                  <Grid item xs={12}>
                    {''}
                  </Grid>
                </Fragment>
              )} */}
              <Grid item xs={12}>
                <Button
                  gameId={gameId}
                  addNewGameInfo={addNewGameInfo}
                  updateGameInfo={updateGameInfo}
                />
              </Grid>
            </Grid>
          </Container>
        </Fragment>
      )}

    </div>
  );
};

export default Game;
