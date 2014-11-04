window.Chattr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Chattr.Routers.AppRouter();
    Chattr.Collections.posts = new Chattr.Collections.Posts;
		Chattr.Collections.users = new Chattr.Collections.Users;
		Chattr.Collections.posts.fetch();
		
    Chattr.Collections.users.fetch({
      success: function () {
        Backbone.history.start();
      }
    })
  }
};

$(document).ready(function(){
  Chattr.initialize();
});

