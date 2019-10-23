import React, { createContext, useState } from 'react';

export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
  const {
    cardGameIsOpen: initialTest,
    children,
  } = props;

  const newGame = {
    name: 'New game',
    createdAt: new Date(),
    isFavorite: false,
    paragraph: 'New paragraph',
    imageUrl: '',
  };
  // Use State to keep the values
  const [cardGameIsOpen, setCardGameIsOpen] = useState(initialTest);
  const [cardGameInfo, setCardGameInfo] = useState(newGame);

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
  };

  // pass the value in provider and return
  return <Context.Provider value={CardGameContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
