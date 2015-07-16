Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
	name: 'postsList',
	data: function() {
		return {
			posts: Posts.find()
		};
	}
});

Router.route('/user/:username', {
	name: 'user',
  data: function() {
  	return { username: this.params.username };
	}	
});

Router.route('/dashboard', {
  name: 'dashboard'
});

Router.route('/account', {
  name: 'account'
});

Router.route('/submit/:vowel', {
  name: 'postSubmit',
  data: function() {
  	var clyp = Posts.findOne({userId: Meteor.userId(), vowel: this.params.vowel});
  	clyp = (clyp) ? clyp.code : "";

  	return {
  		vowel: this.params.vowel,
	  	clyp: clyp
	  };
	}
});


var requireLogin = function() {
  if (! Meteor.user()) {
    this.render('accessDenied');
  } else {
    this.next();
  }
}


Router.onBeforeAction(requireLogin, {only: 'postSubmit'});