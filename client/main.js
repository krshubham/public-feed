import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import './main.html';

//getting the comments collection for all the collections
const Comments = new Mongo.Collection('comments');

Template.body.helpers({
    showComments() {
        return Comments.find({},{sort:{createdAt: -1}});
    }
});
Template.body.events({
    'submit .new-comment'(event) {
        event.preventDefault();
        const target = event.target;
        const text = target.comment.value;
        Comments.insert({
            text: text,
            ownerid: Meteor.userId(),
            email: Meteor.user().emails[0].address,
            createdAt: new Date()
        });
        target.comment.value = '';
    },
    'click .delete'(event){
        var conf = confirm("Are you sure you want to delete it?");
        if(conf){
            Comments.remove(this._id);
        }
        else{
            return false;
        }
    }
});
