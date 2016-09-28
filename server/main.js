import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
const Comments = new Mongo.Collection('comments');

if (Meteor.isServer) {
	Meteor.publish('comments', () => {
		return Comments.find({});
	});
}


Meteor.methods({
	'comments.insert'(todo) {
		check(todo, String);
		//in order to make sure that the user is loggedIn
		if (!this.userId) {
			throw new Meteor.Error('Unauthorized');
		}
		Comments.insert({
			text: todo,
			owner: this.userId,
			email: Meteor.users.findOne(this.userId).username,
			createdAt: new Date()
		});
	},
	'comments.delete'(commentId) {
		check(commentId, String);
		
		const comment = Comments.findOne(commentId);
		
		if (comment.owner !== Meteor.user()._id) {
			throw new Meteor.Error('not-authorized');
		}
		Comments.remove(comment);
	}
});
