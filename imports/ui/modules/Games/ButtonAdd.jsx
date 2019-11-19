import React from 'react';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { makeStyles } from '@material-ui/core/styles';
import colors from '/imports/utils/colors';

const useStyles = makeStyles({
  buttonAdd: {
    backgroundColor: colors('primary.base'),
    color: colors('white'),
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    '&:hover': {
      backgroundColor: colors('primary.dark'),
    },
  },
});


const ButtonAdd = (props) => {
  const classes = useStyles();
  return (
    <Fab {...props} className={classes.buttonAdd}><AddIcon /></Fab>
  );
};

export default ButtonAdd;
