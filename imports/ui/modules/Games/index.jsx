import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { Meteor } from 'meteor/meteor';

import { withRouter } from 'react-router-dom';

import Navbar from '/imports/ui/components/Navbar';

import List from '@material-ui/core/List';
import ButtonAdd from './ButtonAdd';

import ItemGame from './ItemGame';

function Game({ history }) {
  const [listGames, setListGames] = useState([]);

  useEffect(() => {
    Meteor.call('games.get', {}, (err, result) => {
      if (err) toast.error(err.reason);
      else setListGames(result);
    });
  }, []);

  const goNewGame = useCallback(() => { history.push('/game/new'); }, [history]);

  const deleteGame = useCallback((id, e) => {
    e.stopPropagation();
    Meteor.call('games.remove', (id), (err) => {
      if (err) {
        toast.error(err.reason);
      } else {
        setListGames(listGames.filter(game => game._id !== id));
        toast.success('Game deleted');
      }
    });
  }, [listGames]);

  const toggleFavorite = useCallback((id, e) => {
    e.stopPropagation();
    Meteor.call('games.toggleFavorite', (id), (err) => {
      if (err) toast.error(err.reason);
      else {
        const newListGames = listGames.map((game) => {
          if (game._id === id) game.isFavorite = !game.isFavorite;
          return game;
        });
        setListGames(newListGames);
      }
    });
  }, [listGames]);

  const displayGames = useMemo(() => listGames.map(value => (
    <ItemGame
      history={history}
      id={value._id}
      key={value._id}
      name={value.name}
      isFavorite={value.isFavorite}
      imageUrl={value.imageUrl}
      toggleFavorite={toggleFavorite}
      deleteGame={deleteGame}
    />
  )), [deleteGame, history, listGames, toggleFavorite]);

  return (
    <div>
      <Navbar pageName="Page Games" />
      <ToastContainer position="bottom-right" />
      <List dense={false}>
        {displayGames}
      </List>
      <ButtonAdd onClick={goNewGame} />
    </div>
  );
}

export default withRouter(Game);
