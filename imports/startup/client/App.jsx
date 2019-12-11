import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SidebarContextProvider } from '/imports/ui/context';

import Logged from '/imports/ui/components/routes/Logged';
import NoLogged from '/imports/ui/components/routes/NoLogged';
// import Room from '/imports/ui/modules/Room';
import Landing from '/imports/ui/modules/Landing';
// import Users from '/imports/ui/modules/Users';
// import TchatBox from '/imports/ui/modules/TchatBox';
import Errors from '/imports/ui/modules/Errors';
import Users from '/imports/ui/modules/Users';
// import Games from '/imports/ui/modules/Games';
import Game from '/imports/ui/modules/Game';
import Room from '/imports/ui/modules/Room';

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
        <Logged path="/users" component={Users} />
        <Logged path="/games" component={Games} />
        <Logged path="/game/:gameId?" component={Game} />
        <Logged path="/user/game/:gameId?" component={UserGame} />
        <Logged path="/search/games" component={SearchGames} />
        {/* <Route path="/landing" component={Landing} /> */}
        <Route exact path="/" component={Games} />
        <Route path="*" component={Errors} />
      </Switch>
    </Router>
  </SidebarContextProvider>
);

export default App;
