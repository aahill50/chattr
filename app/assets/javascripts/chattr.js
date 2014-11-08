window.Chattr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(currentUserId) {
    Chattr.Collections.posts = new Chattr.Collections.Posts;
		Chattr.Collections.users = new Chattr.Collections.Users;
		Chattr.Collections.hashtags = new Chattr.Collections.Hashtags;

		Chattr.currentUser = new Chattr.Models.User ({ id: currentUserId })
		Chattr.searchHandler = new Chattr.Views.SearchHandler();
		
		Chattr.currentUser.fetch();
		
    
		new Chattr.Routers.AppRouter();
    Backbone.history.start();
  }
};


