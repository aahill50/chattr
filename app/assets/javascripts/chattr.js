window.Chattr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Chattr.Collections.posts = new Chattr.Collections.Posts;
		Chattr.Collections.posts.fetch();
		Chattr.Collections.users = new Chattr.Collections.Users;
		
		$.ajax({
			url: '/api/users/current_user',
			type: 'GET',
			success: function (data) {
				Chattr.currentUser = data
			},
			error: function () {
				Chattr.currentUser = null;
			},
			complete: function () {
		    new Chattr.Routers.AppRouter();
		    Backbone.history.start();
			}
		});
		

  }
};

$(document).ready(function(){
  Chattr.initialize();
});
