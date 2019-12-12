import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  figure: {
    width: '100%',
    maxHeight: '250px',
    overflow: 'hidden',
    margin: 0,
  },
  img: {
    transform: 'translate(-50%, -50%)',
    top: '125px',
    position: 'relative',
    minHeight: '250px',
    minWidth: '100%',
    left: '50%',
  },
});


const ImageGame = ({ url, alt }) => {
  const classes = useStyles();
  return (
    <figure className={classes.figure}>
      <img className={classes.img} src={url} alt={alt} />
    </figure>
  );
};

export default ImageGame;
