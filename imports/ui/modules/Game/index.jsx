import React, { useEffect, useState } from 'react';
import Navbar from '/imports/ui/components/Navbar';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import ImageGame from './ImageGame';
import BottomNavigation from './BottomNavigation';

const useStyles = makeStyles({
  title: { fontWeight: 'bold' },
  container: {
    marginTop: '10px',
  },
});

const Game = ({ history, match: { params: { gameId } } }) => {
  const classes = useStyles();

  const [gameInfo, setGameInfo] = useState(undefined);

  useEffect(() => {
    Meteor.call('games.getOne', (gameId), (err, result) => {
      if (err) console.log(err.reason);
      else setGameInfo(result);
    });
  }, [gameId]);

  return (
    <div>
      <Navbar pageName="Page Game" isOpen />
      {gameInfo
        ? <ImageGame url={gameInfo.imageUrl} alt="img" />
        : <Skeleton variant="rect" width="100%" height="250px" />
      }
      <Container maxWidth="sm" className={classes.container}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {gameInfo
              ? <Typography variant="subtitle1" className={classes.title}>{gameInfo.name}</Typography>
              : <Skeleton variant="text" width="125px" />
            }
          </Grid>
          <Grid item xs={12}>
            {gameInfo
              ? (
                <Typography variant="caption">
                  {`Created at : ${moment(gameInfo.createdAt).format('lll')}`}
                </Typography>
              )
              : <Skeleton variant="text" width="125px" />
            }
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Description: </Typography>
            {gameInfo
              ? (
                <Typography variant="caption">{gameInfo.paragraph}</Typography>
              )
              : <Skeleton variant="text" width="125px" />
            }
          </Grid>
        </Grid>
      </Container>
      {gameInfo
        ? <BottomNavigation history={history} userId={gameInfo.userId} gameId={gameInfo._id} />
        : <di />
      }

    </div>
  );
};

export default withRouter(Game);
