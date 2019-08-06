import React from 'react';
import { Meteor } from 'meteor/meteor';
import { hydrate } from 'react-dom';
import App from './App';
import '/imports/utils/devlog';

Meteor.startup(() => {
  hydrate(<App />, document.getElementById('react-target'));
});
