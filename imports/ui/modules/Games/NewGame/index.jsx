import React, { useState } from 'react';
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
import CardGame from './CardGame';

function NewGame() {
  const [expanded, setExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleExpandClick = () => { setExpanded(!expanded); };
  const handleCloseClick = () => { setIsOpen(!isOpen); };
  const deleteGame = () => { console.log('delete'); };
  const toggleFavorite = () => { console.log('toggleFavorite'); };

  return (
    <CardGame isOpen={isOpen}>
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
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={toggleFavorite}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={deleteGame}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
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
  );
}

export default NewGame;
