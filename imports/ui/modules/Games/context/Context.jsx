import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
  const {
    cardGameIsOpen: initialTest,
    children,
  } = props;

  // Use State to keep the values
  const [cardGameIsOpen, setCardGameIsOpen] = useState(initialTest);
  const [cardGameInfo, setCardGameInfo] = useState({});

  const setCardGame = game => setCardGameInfo(game);
  const toggleCardGame = () => setCardGameIsOpen(!cardGameIsOpen);

  // Make the context object:
  const CardGameContext = {
    cardGameIsOpen,
    toggleCardGame,
    cardGameInfo,
    setCardGame,
  };

  // pass the value in provider and return
  return <Context.Provider value={CardGameContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

Provider.propTypes = {
  cardGameIsOpen: PropTypes.bool,
  setCardGame: PropTypes.object,
};

Provider.defaultProps = {
  cardGameIsOpen: false,
  setCardGame: {},
};
