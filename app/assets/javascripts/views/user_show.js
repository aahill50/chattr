Chattr.Views.UserShow = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.user = options.user;
    this.currentUser = options.currentUser;
    this.posts = options.posts
    this.listenTo(this.currentUser, "sync", this.render)
    this.listenTo(this.user, "sync", this.render)
  },

  template: JST["users/show"],

  tagName: 'main',

  id: 'all-content',

  render: function () {
    var content = this.template({
      user: this.user,
      currentUser: this.currentUser,
      posts: this.posts
    })

    this.$el.html(content);
    return this;
  }
});
