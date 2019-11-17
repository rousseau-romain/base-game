import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


Meteor.methods({

  'usersInfos.update': function ({
    username, age, city, email, gender,
  }) {
    if (!this.userId) {
      throw new Meteor.Error('403', 'You must be connected');
    }
    if (typeof username === 'string') Accounts.setUsername(this.userId, username);

    const oldEmail = Meteor.user().emails[0].address;

    if (
      (typeof email === 'string')
      && (oldEmail !== email)
    ) {
      Accounts.addEmail(this.userId, email);
      Accounts.removeEmail(this.userId, oldEmail);
    }

    if (
      (typeof age === 'number')
      && (typeof city === 'string')
      && (typeof gender === 'string')
    ) {
      Meteor.users.update({ _id: Meteor.userId() }, {
        $set: {
          age,
          city,
          gender,
        },
      });
    }
  },

  'usersInfos.get': function () {
    const user = Meteor.user();
    user.email = user.emails[0].address;
    delete user.services;
    delete user.emails;
    return user;
  },

  // 'usersInfos.remove'({ id }) {
  //   if (!this.userId) {
  //     throw new Meteor.Error('403', 'You must be connected');
  //   }

  //   const article = UsersInfos.findOne(id);

  //   if (article.userId !== this.userId) {
  //     throw new Meteor.Error('403', 'You must be the owner of room');
  //   }

  //   UsersInfos.remove(id);
  // },
});
