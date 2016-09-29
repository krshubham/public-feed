/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

const Comments = new Mongo.Collection('comments');

if (Meteor.isServer) {
  describe('Comments', () => {
    describe('methods', () => {
      const userId = Random.id();
      let commentId;

      beforeEach(() => {
      Comments.remove({});
      commentId = Comments.insert({
			text: 'test comment',
			owner: userId,
			email: 'kumarshubham347@gmail.com',
			createdAt: new Date()
		});
      });

      it('can delete its own comment', () => {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        //console.log();
        const removeComment = Meteor.server.method_handlers['/comments/remove'];

        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        // Run the method with `this` set to the fake invocation
        removeComment.apply(invocation, [commentId]);

        // Verify that the method does what we expected
        assert.equal(Comments.find().count(), 0);
      });
    });
  });
}