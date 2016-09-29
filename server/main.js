import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const Comments = new Mongo.Collection('comments');

if (Meteor.isServer) {
	Meteor.publish('comments', () => {
		return Comments.find({});
	});
}


Meteor.methods({
	'comments.insert'(comment) {
		check(comment, String);
		//in order to make sure that the user is loggedIn
		if (!this.userId) {
			throw new Meteor.Error('Unauthorized');
		}
		Comments.insert({
			text: comment,
			owner: this.userId,
			email: Meteor.users.findOne({_id: this.userId}, {fields: { emails: 1} }).emails[0].address,
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
