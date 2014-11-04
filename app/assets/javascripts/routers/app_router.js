Chattr.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.currentUser = new Chattr.Models.CurrentUser();
    this.$rootEl = $('#body-bottom')
    // this.updateHeader();
  },

  routes: {
    "": "postsIndex",
    "users/:id": "userShow",
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
    this.currentUser.fetch();
    var user = Chattr.Collections.users.getOrFetch(id);
		
    var userShowView = new Chattr.Views.UserShow({
      user: user,
      currentUser: this.currentUser,
      posts: user.posts()
    })
    this._swapView(userShowView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove()
    this._currentView = view;
    this.$rootEl.html(view.render().$el)
  }
})