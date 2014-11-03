Chattr.Views.UserShow = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.user = options.user;
    this.currentUser = options.currentUser;
    this.collection = options.collection
    this.listenTo(this.currentUser, "sync", this.render)
  },

  template: JST["users/show"],

  tagName: 'main',

  id: 'all-content',

  render: function () {
    var content = this.template({
      user: this.user,
      currentUser: this.currentUser
    })

    this.$el.html(content);
    this.renderUserPosts();
    return this;
  },

  renderUserPosts: function () {
    var postsIndex = new Chattr.Views.PostsIndex({ collection: this.collection })
    this.addSubview('#inner-content', postsIndex);
  }
});