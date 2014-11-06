Chattr.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
		
		if (Chattr.currentUser) {
			this.updateHeader(true);
			var path = window.location.pathname;
			this.navigate(path, { trigger: true })
			
		} else {
			window.location.hash = "";
			this.updateHeader(false);
		}

    this.$rootEl = $('#body-bottom')
  },

  routes: {
    "posts": "postsIndex",
    "users/:id": "userShow",
		"session/new": "signIn"
    // "posts/:id": "postShow"
  },

  updateHeader: function (is_signedIn) {
    if (is_signedIn) {
      var siteHeaderView = new Chattr.Views.SiteHeader()
      $('header#site-header').html(siteHeaderView.render().$el)
    } else {
      var siteHeaderView = new Chattr.Views.SiteHeader()
      $('header#site-header').html(siteHeaderView.render().$el)
    }

  },

  postsIndex: function () {
    Chattr.Collections.posts.fetch();
    this.updateHeader(true)

    var postsIndexView = new Chattr.Views.PostsIndex({
      posts: Chattr.Collections.posts,
      currentUser: Chattr.currentUser
    });
    this._swapView(postsIndexView)
  },

  userShow: function (id) {
    var that = this;
    var user = Chattr.Collections.users.getOrFetch(id);
    user.fetch();

    var userShowView = new Chattr.Views.UserShow({
      user: user,
      posts: user.posts()
    })
    this._swapView(userShowView);
  },

	signIn: function () {
    this.updateHeader(false)
		var sessionNewView = new Chattr.Views.SessionNew();
    this._swapView(sessionNewView);
	},

  _swapView: function (view) {
    this._currentView && this._currentView.remove()
    this._currentView = view;
    this.$rootEl.html(view.render().$el)
  }
})
