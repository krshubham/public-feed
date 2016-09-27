import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
const Comments = new Mongo.Collection('comments');
Meteor.startup(() => {
  // code to run on server at startup
});
