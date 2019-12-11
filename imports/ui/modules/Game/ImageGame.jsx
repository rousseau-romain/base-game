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
    width: '100%',
    transform: 'translateY(-50%)',
    top: '125px',
    position: 'relative',
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
