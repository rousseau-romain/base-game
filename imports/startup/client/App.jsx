import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SidebarContextProvider } from '/imports/ui/context';

import {
  Signin,
  Signup,
  // Missing,
  Settings,
  // Verify,
} from '/imports/ui/modules/Accounts';

import {
  SearchGames,
} from '/imports/ui/modules/Search';

import {
  Game as UserGame, Games,
} from '/imports/ui/modules/User';

import Logged from '/imports/ui/components/routes/Logged';
import NoLogged from '/imports/ui/components/routes/NoLogged';
import Errors from '/imports/ui/modules/Errors';
import Messages from '/imports/ui/modules/Messages';
import Game from '/imports/ui/modules/Game';
import Room from '/imports/ui/modules/Room';

const App = () => (
  <SidebarContextProvider>
    <Router>
      <Switch>
        <NoLogged path="/signin" component={Signin} />
        <NoLogged path="/signup" component={Signup} />
        {/* <NoLogged path="/missing" component={Missing} /> */}
        <Logged path="/settings" component={Settings} />
        {/* <Logged path="/verify" component={Verify} /> */}
        <Logged path="/room/:roomId?" component={Room} />
        <Logged path="/messages" component={Messages} />
        <Logged path="/games" component={Games} />
        <Logged path="/game/:gameId?" component={Game} />
        <Logged path="/user/game/:gameId?" component={UserGame} />
        <Logged path="/search/games" component={SearchGames} />
        <Route exact path="/" component={Games} />
        <Route path="*" component={Errors} />
      </Switch>
    </Router>
  </SidebarContextProvider>
);

export default App;
