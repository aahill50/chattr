Chattr.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.posts = new Chattr.Collections.Posts();
  },

  routes: {
    "": "indexView",
    "posts/:id": "postShow"
  },

  indexView: function () {
    var posts = this.posts
    posts.fetch();

    var indexView = new Chattr.Views.IndexView({
      collection: posts
    });
    $el = $('#all-content');
    this._swapView(indexView, $el);
  },

  postShow: function (id) {
    var post = this.posts.getOrFetch(id);
    var showView = new Chattr.Views.PostShow({ model: post });
    $el = $('.post-container')
    this._swapView(showView, $el);
  },

  _swapView: function (view, $rootEl) {
    this._currentView && this._currentView.remove()
    this._currentView = view;
    $rootEl.html(view.render().$el)
  }
})