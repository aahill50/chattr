Chattr.Views.MainFeed = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.collection, "sync", this.render)
  },

  template: JST["main"],

  tagName: 'main',

  className: 'main-content',

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.renderIndexProfile();
    this.renderPosts()
    return this;
  },

  renderIndexProfile: function () {
    var indexProfile = new Chattr.Views.IndexProfile({ model: this.model });
    this.addSubview('.index-profile', indexProfile)
  },

  renderPosts: function () {
    var postsIndex = new Chattr.Views.PostsIndex({ collection: this.collection })
    this.addSubview('.post-container', postsIndex)
  }
});