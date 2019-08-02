import { Meteor } from 'meteor/meteor';

global.devlog = (message, label = 'DEVLOG') => {
  if (Meteor.isDevelopment) {
    console.log(`[${label}]`, message); // eslint-disable-line no-console
  }

  return message;
};
