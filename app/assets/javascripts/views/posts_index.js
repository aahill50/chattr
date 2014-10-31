Chattr.Views.PostsIndex = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.collection, "sync", this.render)
  },

  tagName: "section",

  className: "post-container",

  template: JST["posts/index"],

  render: function () {
    var content = this.template({ posts: this.collection })
    this.$el.html(content)
    return this;
  }
});