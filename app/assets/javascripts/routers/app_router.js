Chattr.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.currentUser = new Chattr.Models.CurrentUser();
    this.$rootEl = $('#body-bottom')
    this.updateHeader();
  },

  routes: {
    "": "postsIndex",
    "users/:id": "userShow",
		"signin": "signIn"
    // "posts/:id": "postShow"
  },

  updateHeader: function () {
    var that = this;
    this.currentUser.fetch({
      success: function () {
        var siteHeaderView = new Chattr.Views.SiteHeader({ model: that.currentUser })
        $('header#site-header').html(siteHeaderView.render().$el)
      }
    });
  },

  postsIndex: function () {
    var that = this;
    Chattr.Collections.posts.fetch();

    this.currentUser.fetch({
      success: function () {
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
		var sessionNewView = new Chattr.Views.SessionNew();
		$('body').html(sessionNewView.render().$el);
	},

  _swapView: function (view) {
    this._currentView && this._currentView.remove()
    this._currentView = view;
    this.$rootEl.html(view.render().$el)
  }
})
