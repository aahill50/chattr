window.Chattr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		console.log("initializing...")
    Chattr.Collections.posts = new Chattr.Collections.Posts;
		Chattr.Collections.posts.fetch();
		Chattr.Collections.users = new Chattr.Collections.Users;
		
		Chattr.Collections.users.fetch({
			success: function () {
				$.ajax({
					url: '/api/users/current_user',
					type: 'GET',
					success: function (data) {
						Chattr.currentUser = Chattr.Collections.users.get(data.id)
						Chattr.currentUser.fetch();
					},
					error: function () {
						Chattr.currentUser = null;
					},
					complete: function () {
						console.log("chattr backbone starting...")
				    Chattr.appRouter = new Chattr.Routers.AppRouter();
				    Backbone.history.start();
					}
				});
			}
		});
  }
};


