Chattr.Views.IndexView = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.listenTo(this.collection, "sync", this.renderPosts)
  },

  template: JST["index"],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.renderPosts();
    this.renderIndexProfile();
    return this;
  },

  renderIndexProfile: function () {
    console.log("rendering index")
    var indexProfileView = new Chattr.Views.IndexProfile({})
    this.addSubview('.index-profile', indexProfileView);
  },

  renderPosts: function () {
    console.log(this.collection)
    var postsIndexView = new Chattr.Views.PostsIndex({
        collection: this.collection
    })
    this.addSubview('.post-container', postsIndexView);
  }
});