var vowelsList = [
  {
    name: 'i',
    list: [
      'meet',
      'read',
      'eat',
      'speak',
      'see',
      'mean',
    ]
  }, 
  {
    name: 'ɪ',
    list: [
      'sit',
      'quit',
      'drink',
      'chip',
      'sick',
      'live'
    ]
  }, 
  {
    name: 'eɪ',
    list: [
      'take',
      'play',
      'say',
      'stay',
      'day',
      'wait'
    ]
  },
  {
    name: 'ɛ',
    list: [
      'get',
      'next',
      'spend',
      'tell',
      'end',
      'men'
    ]
  },
  {
    name: 'æ',
    list: [
      'bad',
      'last',
      'sad',
      'add',
      'plan',
      'and'
    ]
  },
  {
    name: 'a',
    list: [
      'stop',
      'want',
      'watch',
      'job',
      'body',
      'hot'
    ]
  },
  {
    name: 'ɔ',
    list: [
      'walk',
      'small',
      'tall',
      'dog',
      'long',
      'law',
    ]
  },
  {
    name: 'u',
    list: [
      'do',
      'new',
      'two',
      'choose',
      'lose',
      'room',
    ]
  },
  {
    name: 'ʊ',
    list: [
      'good',
      'look',
      'push',
      'book',
      'cook',
    ]
  },
  {
    name: 'oʊ',
    list: [
      'know',
      'home',
      'hope',
      'slow',
      'old',
      'cold',
    ]
  },
  {
    name: 'ə(ʌ)',
    list: [
      'up',
      'run',
      'come',
      'but',
      'one',
    ]
  },
  {
    name: 'aɪ',
    list: [
      'nice',
      'kind',
      'high',
      'buy',
      'night',
      'time',
    ]
  },
  {
    name: 'aʊ',
    list: [
      'now',
      'down',
      'out',
      'house',
      'crowd',
    ]
  },
  {
    name: 'ɔɪ',
    list: [
      'point',
      'join',
      'noise',
      'choice',
      'boy',
      'toy',
    ]
  },
  {
    name: 'ər',
    list: [
      'learn',
      'turn',
      'hurt',
      'word',
      'work',
    ]
  }
];

Errors = new Mongo.Collection(null);
throwError = function(message) {
  Errors.insert({message: message});
};

deleteUser = function(_id) {
  Meteor.call('deleteUser', _id, function(error, result) {
    // display the error to the user and abort
    if (error)
      return alert(error.reason);
  });   
}


Template.dashboard.helpers({
  vowels: vowelsList,

  clyp: function(name){
    var clyp = Posts.findOne({userId: Meteor.userId(), vowel: name});
    return (clyp) ? clyp.code : "";
  }
});

Template.postsList.helpers({
  users: function(){
    return Meteor.users.find();
  },
  submitted: function(username){
    return Posts.find({author: username}).count();
  }
});

Template.user.helpers({
  vowels: vowelsList,

  clyp: function(name, username){
    var clyp = Posts.findOne({author: Template.parentData().username, vowel: name});
    return (clyp) ? clyp.code : "";
  }
});


// Template.postSubmit.helpers({
// });


Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      code: $(e.target).find('[name=code]').val(),
      vowel: Template.currentData().vowel
    };

    Meteor.call('postInsert', post, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);

      if (result.wrongFormat) {
        throwError('Wrong format.')
      }
    });
  }
});

Template.account.events({
  'submit form': function(e) {
    e.preventDefault();
    var name = $(e.target).find('[name=name]').val();

    Meteor.call('changeName', name, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);
    });    
  }
});

Template.errors.helpers({
  errors: function() {
    return Errors.find();
  }
});
