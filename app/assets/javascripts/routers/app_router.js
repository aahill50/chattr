Chattr.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = $('#body-bottom')
  },

  routes: {
    "": "postsIndex",
		"users/new": "signUp",
    "users/:id": "userShow",
		"session/new": "signIn",
    "posts/:id": "postShow",
		"hashtags": "tagsIndex",
		"hashtags/:id": "tagShow"
  },

  postsIndex: function () {
    var postsIndexView = new Chattr.Views.PostsIndex({
      posts: Chattr.Collections.posts
    });
    this._swapView(postsIndexView)
  },
	
	tagsIndex: function () {
		var tagsIndexView = new Chattr.Views.HashtagsIndex({
			tags: Chattr.Collections.hashtags
		});
		this._swapView(tagsIndexView);
	},
	
	postShow: function (id) {
		var that = this;
		var post = Chattr.Collections.posts.getOrFetch(id);
		
		post.fetch({
			success: function () {
				var postShowView = new Chattr.Views.PostShow({
					post: post
				});
				that._swapView(postShowView);
			}
		});
	},

	tagShow: function (id) {
		var that = this;
		var tag = Chattr.Collections.hashtags.getOrFetch(id);
		
		tag.fetch({
			success: function () {
				var tagShowView = new Chattr.Views.HashtagShow({
					tag: tag
				});
				that._swapView(tagShowView);
			}
		});
	},

  userShow: function (id) {
    var that = this;
    var user = Chattr.Collections.users.getOrFetch(id);
    user.fetch();

    var userShowView = new Chattr.Views.UserShow({
      user: user
    })
    this._swapView(userShowView);
  },

	signIn: function () {
		Chattr.currentUser = null;
		var sessionNewView = new Chattr.Views.SessionNew();
    this._swapView(sessionNewView);
	},

	signUp: function () {
		console.log(newUser)
		var newUser = new Chattr.Models.User
		Chattr.currentUser = null;
		var userNewView = new Chattr.Views.UserNew({user: newUser});
    this._swapView(userNewView);
	},
	
  _swapView: function (view) {
    this._currentView && this._currentView.remove()
    this._currentView = view;
    this.$rootEl.html(view.render().$el)
  }
})
