import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { GENDERS } from '/imports/utils/constants';

const UserSchema = new SimpleSchema({
  dateOfBirth: {
    type: Date,
    max: 255,
    optional: true,
  },
  city: {
    type: String,
    max: 255,
    optional: true,
  },
  gender: {
    type: String,
    allowedValues: Object.values(GENDERS),
    optional: true,
  },

  username: {
    type: String,
    optional: true,
  },
  emails: {
    type: Array,
    optional: true,
  },
  'emails.$': {
    type: Object,
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  'emails.$.verified': {
    type: Boolean,
  },

  services: {
    type: Object,
    blackbox: true,
  },
  createdAt: {
    type: Date,
  },
});

Meteor.users.attachSchema(UserSchema);

export default Meteor.users;
