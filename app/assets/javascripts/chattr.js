window.Chattr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(currentUserId) {
    Chattr.Collections.posts = new Chattr.Collections.Posts;
		Chattr.Collections.users = new Chattr.Collections.Users;
		Chattr.currentUser = new Chattr.Models.User ({ id: currentUserId })
		Chattr.searchHandler = new Chattr.Views.SearchHandler();
		console.log("fetching....")
		
		Chattr.Collections.posts.fetch();
		Chattr.Collections.users.fetch();
		Chattr.currentUser.fetch();
		
    
		new Chattr.Routers.AppRouter();
    Backbone.history.start();
  }
};


