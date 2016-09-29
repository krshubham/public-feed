import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Mongo } from 'meteor/mongo';
import './main.html';

//getting the comments collection for all the collections
const Comments = new Mongo.Collection('comments');

Template.body.onCreated(()=>{
  this.state = new ReactiveDict();
  Meteor.subscribe('comments');
});

Template.body.helpers({
    ShowComments(){
    return Comments.find({}, { sort: { createdAt: -1 } });
  },
  isOwner(){
      return this;
  }
});


Template.registerHelper('log',(something)=>{
    console.log(something);
});

Template.body.events({
    'submit .new-comment'(event) {
        event.preventDefault();
        const target = event.target;
        const text = target.comment.value;
        if(!text){
            alert('Please Fill Something');
            return false;
        }
        Meteor.call('comments.insert',text);
        target.comment.value = '';
    },
    'click .logout'(){
        window.localStorage.removeItem('Meteor.loginToken');
        window.location = '/';
    },
    'click .delete'(){
        Meteor.call('comments.delete',this._id,function(err,result){
            if(err.error === 'not-authorized'){
                alert("Sorry! You can't delete someone else's comment");
            }            
        });
    }
});
