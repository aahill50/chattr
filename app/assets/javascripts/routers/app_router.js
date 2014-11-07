Chattr.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = $('#body-bottom')
  },

  routes: {
    "": "postsIndex",
		"users/new": "signUp",
    "users/:id": "userShow",
		"session/new": "signIn"
    // "posts/:id": "postShow"
  },

  // updateHeader: function (is_signedIn) {
  //   if (is_signedIn) {
  //     var siteHeaderView = new Chattr.Views.SiteHeader()
  // 			$('body').removeClass('unsigned')
  //     // $('header#site-header').html(siteHeaderView.render().$el)
  //   } else {
  // 			$('body').addClass('unsigned')
  //     var siteHeaderView = new Chattr.Views.SiteHeader()
  //     // $('header#site-header').html(siteHeaderView.render().$el)
  //   }
  //
  // },

  postsIndex: function () {
    Chattr.Collections.posts.fetch();
    // this.updateHeader(true)

    var postsIndexView = new Chattr.Views.PostsIndex({
      posts: Chattr.Collections.posts
    });
    this._swapView(postsIndexView)
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
    // this.updateHeader(false)
		var sessionNewView = new Chattr.Views.SessionNew();
    this._swapView(sessionNewView);
	},

	signUp: function () {
		console.log(newUser)
		var newUser = new Chattr.Models.User
		Chattr.currentUser = null;
    // this.updateHeader(false)
		var userNewView = new Chattr.Views.UserNew({user: newUser});
    this._swapView(userNewView);
	},
	
  _swapView: function (view) {
    this._currentView && this._currentView.remove()
    this._currentView = view;
    this.$rootEl.html(view.render().$el)
  }
})
