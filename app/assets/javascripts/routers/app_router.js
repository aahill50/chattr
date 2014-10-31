Chattr.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.posts = new Chattr.Collections.Posts();
    this.$rootEl = $('#all-content')
  },

  routes: {
    "": "mainFeed",
    // "": "postsIndex",
    // "posts/:id": "postShow"
  },

  mainFeed: function () {
    var current_user = new Chattr.Models.CurrentUser()
    var posts = this.posts
    current_user.fetch()
    posts.fetch();

    var mainFeedView = new Chattr.Views.MainFeed({
      collection: posts,
      model: current_user
    });
    this._swapView(mainFeedView)
  },

  // postsIndex: function () {
  //   var posts = this.posts
  //   posts.fetch();
  //
  //   var indexView = new Chattr.Views.PostsIndex({
  //     collection: posts
  //   });
  //   $el = $('#all-content');
  //   this._swapView(indexView, $el);
  // },
  //
  // postShow: function (id) {
  //   var post = this.posts.getOrFetch(id);
  //   var showView = new Chattr.Views.PostShow({ model: post });
  //   $el = $('.post-container')
  //   this._swapView(showView, $el);
  // },

  _swapView: function (view) {
    this._currentView && this._currentView.remove()
    this._currentView = view;
    this.$rootEl.html(view.render().$el)
  }
})