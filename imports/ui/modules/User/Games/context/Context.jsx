import React, { createContext, useState } from 'react';

export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
  const {
    cardGameIsOpen: initialTest,
    children,
  } = props;

  const newGame = null;
  // Use State to keep the values
  const [cardGameIsOpen, setCardGameIsOpen] = useState(initialTest);
  const [cardGameInfo, setCardGameInfo] = useState(newGame);

  const setNewCardGame = () => setCardGameInfo(newGame);
  const setCardGame = game => setCardGameInfo(game);
  const toggleCardGame = () => setCardGameIsOpen(!cardGameIsOpen);
  const openCardGame = () => setCardGameIsOpen(true);
  const closeCardGame = () => setCardGameIsOpen(false);

  // Make the context object:
  const CardGameContext = {
    cardGameIsOpen,
    toggleCardGame,
    openCardGame,
    closeCardGame,
    cardGameInfo,
    setCardGame,
    setNewCardGame,
  };

  // pass the value in provider and return
  return <Context.Provider value={CardGameContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
