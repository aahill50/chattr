Chattr.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    var router = this;
    this.currentUser = new Chattr.Models.CurrentUser();

    this.currentUser.fetch({
      success: function () {
        router.updateHeader(true);
        router.navigate("/posts", { trigger: true })
      },
      error: function () {
        router.updateHeader(false);
        router.navigate("/", { trigger: true })
      }
    })
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
      var siteHeaderView = new Chattr.Views.SiteHeader({ model: this.currentUser })
      $('header#site-header').html(siteHeaderView.render().$el)
    } else {
      var siteHeaderView = new Chattr.Views.SiteHeader({ model: null })
      $('header#site-header').html(siteHeaderView.render().$el)
    }

  },

  postsIndex: function () {
    var that = this;
    Chattr.Collections.posts.fetch();

    this.currentUser.fetch({
      success: function () {
        that.updateHeader(true)
        var postsIndexView = new Chattr.Views.PostsIndex({
          posts: Chattr.Collections.posts,
          currentUser: that.currentUser
        });
        that._swapView(postsIndexView)
      }
    });
  },

  userShow: function (id) {
    var that = this;
    var user = Chattr.Collections.users.getOrFetch(id);

    this.currentUser.fetch({
      success: function () {
        var userShowView = new Chattr.Views.UserShow({
          user: user,
          currentUser: that.currentUser,
          posts: user.posts()
        })
        that._swapView(userShowView);
      }
    });
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
