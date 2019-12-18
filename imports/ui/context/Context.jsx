import React, { createContext, useState } from 'react';

export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
  const {
    sidebarIsOpen: sidebarIsOpenInitial,
    inputSearch: inputSearchInitial,
    children,
  } = props;

  // Use State to keep the values
  const [sidebarIsOpen, setSidebarIsOpen] = useState(sidebarIsOpenInitial);
  const [inputSearch, setInputSearch] = useState(inputSearchInitial || '');

  const toggleSidebar = () => {
    setInputSearch('');
    setSidebarIsOpen(!sidebarIsOpen);
  };

  // Make the context object:
  const sidebarContext = {
    sidebarIsOpen,
    toggleSidebar,
    setInputSearch,
    inputSearch,
  };

  // pass the value in provider and return
  return <Context.Provider value={sidebarContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
