import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Logged from '/imports/ui/components/routes/Logged';
import NoLogged from '/imports/ui/components/routes/NoLogged';
// import Room from '/imports/ui/modules/Room';
import Landing from '/imports/ui/modules/Landing';
// import Users from '/imports/ui/modules/Users';
// import TchatBox from '/imports/ui/modules/TchatBox';
import Errors from '/imports/ui/modules/Errors';
import Games from '/imports/ui/modules/Games';

import { SidebarContextProvider } from '/imports/ui/context';

import {
  Signin,
  Signup,
  // Missing,
  // Settings,
  // Verify,
} from '/imports/ui/modules/Accounts';

const App = () => (
  <SidebarContextProvider>
    <Router>
      <Switch>
        <NoLogged path="/signin" component={Signin} />
        <NoLogged path="/signup" component={Signup} />
        {/* <NoLogged path="/missing" component={Missing} /> */}
        {/* <Logged path="/settings" component={Settings} /> */}
        {/* <Logged path="/verify" component={Verify} /> */}
        {/* <Logged path="/room/:id" component={Room} /> */}
        <Logged path="/games" component={Games} />
        <Route path="/landing" component={Landing} />
        {/* <Logged path="/users" component={Users} /> */}
        {/* <Logged path="/tchatbox" component={TchatBox} /> */}
        <Route exact path="/" component={Landing} />
        <Route path="*" component={Errors} />
      </Switch>
    </Router>
  </SidebarContextProvider>
);

export default App;
