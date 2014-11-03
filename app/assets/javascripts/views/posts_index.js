Chattr.Views.PostsIndex = Backbone.View.extend({
  initialize: function (options) {
    this.posts = options.posts;
    this.currentUser = options.currentUser;
    // this.listenTo(this.posts, "sync", this.render)
    // this.listenTo(this.currentUser, "sync", this.render)
  },

  template: JST["posts/index"],

  tagName: 'section',

  id: 'body-bottom',

  render: function () {
    var content = this.template({
      posts: this.posts,
      currentUser: this.currentUser
    });
    this.$el.html(content);
    return this;
  },
});