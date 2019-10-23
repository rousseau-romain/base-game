import React, {
  useState, useContext, useEffect,
} from 'react';

import formatDate from '/imports/utils/formatDate';
import goToUrl from '/imports/utils/goToUrl';

import { Meteor } from 'meteor/meteor';

import { toast } from 'react-toastify';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';

import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import CardGame from './CardGame';

import { CardGameContext } from '../context';

function Game({ history }) {
  const { openCardGame } = useContext(CardGameContext);
  const { closeCardGame } = useContext(CardGameContext);
  const { cardGameIsOpen } = useContext(CardGameContext);
  const { cardGameInfo } = useContext(CardGameContext);
  const { setCardGame } = useContext(CardGameContext);


  const [listGames, setListGames] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => { setExpanded(!expanded); };
  const handleCloseClick = () => { closeCardGame(); };
  const deleteGame = (id) => { console.log(`delete: ${id}`); };
  const toggleFavorite = () => { cardGameInfo.isFavorite = !cardGameInfo.isFavorite; };
  const updateGame = (id) => {
    Meteor.call('games.update', ({
      id,
      name: cardGameInfo.name,
      isFavorite: cardGameInfo.isFavorite,
      paragraph: cardGameInfo.paragraph,
    }), (err, result) => {
      if (err) toast.error(err.reason);
      else console.log(result);
    });
  };

  useEffect(() => {
    Meteor.call('games.get', {}, (err, result) => {
      if (err) toast.error(err.reason);
      else setListGames(result);
    });
  }, []);


  return (
    <div>
      <List dense={false}>
        { listGames.map(value => (
          <ListItem
            key={value._id._str}
            onClick={() => {
              Meteor.call('games.getOne', (value._id._str), (err, result) => {
                if (err) toast.error(err.reason);
                else {
                  setCardGame(result);
                  openCardGame();
                }
              });
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={value.name}
              secondary={null}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="favorite"
                onClick={() => {
                  // toggleFavorite(!cardGameInfo.isFavorite);
                  updateGame(value._id._str);
                }}
              >
                <FavoriteIcon />
              </IconButton>
              <IconButton
                aria-label="edit"
                edge="end"
                onClick={() => goToUrl(history, `game/${value._id._str}`)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={deleteGame}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <CardGame isOpen={cardGameIsOpen}>
        <CardHeader
          avatar={(
            <Avatar aria-label="recipe">
            R
            </Avatar>
          )}
          action={(
            <IconButton aria-label="close">
              <CloseIcon onClick={handleCloseClick} />
            </IconButton>
          )}
          title={cardGameInfo.name}
          subheader={formatDate(cardGameInfo.createdAt)}
        />
        <CardMedia
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {!cardGameInfo.paragraph}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              toggleFavorite(!cardGameInfo.isFavorite);
              updateGame(cardGameInfo._id._str);
            }}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            onClick={() => goToUrl(history, `game/${cardGameInfo._id._str}`)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => deleteGame(cardGameInfo._id._str)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
            </Typography>
            <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography>
          </CardContent>
        </Collapse>
      </CardGame>
    </div>
  );
}

export default Game;
