import React, {
  useEffect, useState, Fragment,
} from 'react';
import Navbar from '/imports/ui/components/Navbar';
import { Meteor } from 'meteor/meteor';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import { toast, ToastContainer } from 'react-toastify';


const Game = ({ match: { params: { gameId } } }) => {
  const [gameInfo, setGameInfo] = useState(undefined);

  useEffect(() => {
    Meteor.call('games.getOne', (gameId), (err, result) => {
      if (err) toast.error(err.reason);
      else setGameInfo(result);
    });
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
    }, (err, result) => {
      if (err) toast.error(err.reason);
      else console.log('save', result, gameInfo);
    });
  };
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <p>
        {'Game Id : '}
        {gameId}
      </p>
      {gameInfo !== undefined && (
        <Fragment>
          <TextField
            id="standard-name"
            label="Name"
            value={gameInfo.name}
            onChange={changeGameInfo('name')}
            margin="normal"
          />
          <TextField
            id="standard-multiline-flexible"
            label="Multiline"
            multiline
            rowsMax="4"
            value={gameInfo.paragraph}
            onChange={changeGameInfo('paragraph')}
            margin="normal"
          />
          <TextField
            label="imageUrl"
            id="standard-imageUrl"
            value={gameInfo.imageUrl}
            onChange={changeGameInfo('imageUrl')}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            endIcon={<SaveIcon />}
            onClick={updateGameInfo}
          >
            {'Save'}
          </Button>
        </Fragment>
      )}
    </div>
  );
};

export default Game;
