import React from 'react';
import ButtonUi from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    margin: '0 auto',
    display: 'flex',
  },
});
const Button = ({ gameId, addNewGameInfo, updateGameInfo }) => {
  const classes = useStyles();
  return (
    gameId === 'new' ? (
      <ButtonUi
        className={classes.button}
        variant="contained"
        color="primary"
        endIcon={<AddIcon />}
        onClick={addNewGameInfo}
      >
        {'Add'}
      </ButtonUi>
    ) : (
      <ButtonUi
        className={classes.button}
        variant="contained"
        color="primary"
        endIcon={<SaveIcon />}
        onClick={updateGameInfo}
      >
        {'Save'}
      </ButtonUi>
    )
  );
};

export default Button;
