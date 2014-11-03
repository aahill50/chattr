Chattr.Views.MainFeed = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.collection, "sync", this.render)
  },

  template: JST["main"],

  tagName: 'main',

  id: 'main-content',

  render: function () {
    var content = this.template();
    this.$el.html(content);
    $('#inner-content').empty();
    this.renderIndexProfile();
    this.renderPosts();
    return this;
  },

  renderIndexProfile: function () {
    var indexProfile = new Chattr.Views.IndexProfile({ model: this.model });
    this.addSubview('#inner-content', indexProfile);
  },

  renderPosts: function () {
    var postsIndex = new Chattr.Views.PostsIndex({ collection: this.collection })
    this.addSubview('#inner-content', postsIndex);
  }
});