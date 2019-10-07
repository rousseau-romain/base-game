import React from 'react';

import { CardGameContextProvider } from '/imports/ui/modules/Games/context';
import PageGame from './PageGame';

const WrapperContextGame = () => (
  <CardGameContextProvider>
    <PageGame />
  </CardGameContextProvider>

);

export default WrapperContextGame;
