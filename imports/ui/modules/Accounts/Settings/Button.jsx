import React from 'react';
import ButtonUi from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    margin: '0 auto',
    display: 'flex',
  },
});
const Button = ({ updateUserInfo }) => {
  const classes = useStyles();
  return (
    <ButtonUi
      className={classes.button}
      variant="contained"
      color="primary"
      endIcon={<SaveIcon />}
      onClick={updateUserInfo}
    >
      {'Save'}
    </ButtonUi>
  );
};

export default Button;
