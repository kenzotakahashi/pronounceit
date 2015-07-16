Posts = new Mongo.Collection('posts');

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    // check(postAttributes, {
    //   code: String,
    // });

    var code = postAttributes.code;

  	if (code.slice(0,39) != '<iframe width="100%" height="160" src="' ||
  			code.slice(-27) != '" frameborder="0"></iframe>') {
  		console.log('wrongFormat');
  		return {
  			wrongFormat: true
  		}
  	}
  	postAttributes.code = code.slice(39, -27);

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date()
    });  	

    var postWithSameVowel = Posts.findOne({userId: this.userId, vowel: postAttributes.vowel});

    if (postWithSameVowel) {
    	var postId = Posts.update({_id: postWithSameVowel._id}, {$set: post});
    } else {
	    var postId = Posts.insert(post);
    }

    return { _id: postId };
  },

  changeName: function(name) {
    check(Meteor.userId(), String);

  	var postId = Meteor.users.update({_id: Meteor.userId()}, {$set: {username: name}});
  },

  deleteUser: function(_id) {
	  Meteor.users.remove({_id: _id});
  }
});











