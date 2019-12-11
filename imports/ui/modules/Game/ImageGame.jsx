import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  figure: {
    width: '100%',
    maxHeight: '250px',
    overflow: 'hidden',
    backgroundColor: 'red',
    margin: 0,
  },
  img: {
    width: '100%',
    display: 'block',
    transform: 'translateY(-50%)',
    top: '50%',
    position: 'sticky',
    WebkitPosition: 'sticky',
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
