import React from 'react';

import { CardGameContextProvider } from '/imports/ui/modules/Games/context';
import PageGame from './PageGame';

const WrapperContextGame = ({ history }) => (
  <CardGameContextProvider>
    <PageGame history={history} />
  </CardGameContextProvider>

);

export default WrapperContextGame;
