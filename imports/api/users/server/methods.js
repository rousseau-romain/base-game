import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Users from '..';


Meteor.methods({

  'usersInfos.update': function ({
    username, dateOfBirth, city, email, gender,
  }) {
    if (!this.userId) {
      throw new Meteor.Error('403', 'You must be connected');
    }

    const oldEmail = Meteor.user().emails[0].address;
    if (oldEmail !== email) {
      Accounts.addEmail(this.userId, email);
      Accounts.removeEmail(this.userId, oldEmail);
    }

    if (username) Accounts.setUsername(this.userId, username);

    if (typeof (dateOfBirth) === 'object' && typeof (city) === 'string' && typeof (gender) === 'string') {
      Meteor.users.update({ _id: Meteor.userId() }, {
        $set: {
          dateOfBirth,
          city,
          gender,
        },
      }, { upsert: true });
    }
  },

  'usersInfos.get': function () {
    const user = Meteor.user();
    user.email = user.emails[0].address;
    delete user.services;
    delete user.emails;
    return user;
  },

  'users.get': function () {
    const users = Users.find({}, {
      sort: { createdAt: -1 },
      limit: 50,
      // skip: 50,
    }).fetch();

    users.splice(users.findIndex(u => u._id === this.userId), 1);

    return users.map((user) => {
      user.email = user.emails[0].address;
      delete user.services;
      delete user.emails;
      return user;
    });
  },
});
