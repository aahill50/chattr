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

    Backbone.history.start({pushState: true});
  }
};

$(document).ready(function(){
  Chattr.initialize();
});
