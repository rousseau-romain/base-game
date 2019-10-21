import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
  const {
    sidebarIsOpen: initialTest,
    children,
  } = props;

  // Use State to keep the values
  const [sidebarIsOpen, setSidebarIsOpen] = useState(initialTest);

  const toggleTest = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  // Make the context object:
  const sidebarContext = {
    sidebarIsOpen,
    toggleTest,
  };

  // pass the value in provider and return
  return <Context.Provider value={sidebarContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

Provider.propTypes = {
  sidebarIsOpen: PropTypes.bool,
};

Provider.defaultProps = {
  sidebarIsOpen: false,
};
