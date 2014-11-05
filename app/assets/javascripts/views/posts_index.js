Chattr.Views.PostsIndex = Backbone.View.extend({
  initialize: function (options) {
    this.posts = options.posts;
    this.currentUser = options.currentUser;
    this.listenTo(this.posts, "sync", this.render);
  },

  events: {
    "submit .new-post": "submitNewPost",
    "focus .index-profile .closed": "expandForm",
    "blur .index-profile": "closeForm",
    "click button.reply": "setupReply",
    "click button.repost": "setupRepost",
    "click button.favorite": "toggleFavorite",
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

  submitNewPost: function (event) {
    event.preventDefault();
    var that = this;

    params = $(event.currentTarget).serializeJSON()['post']
    var post = new Chattr.Models.Post(params)
    post.save([],{
      success: function () {
        that.posts.add(post)
      }
    })
  },

  expandForm: function (event) {
    $(event.currentTarget).removeClass("closed");
  },

  closeForm: function (event) {
    $(event.target).closest('form').addClass("closed");
  },

  setupRepost: function (event) {
    event.preventDefault();
    var $post = $(event.currentTarget).closest('.post');
    $post.find('.repost-form').removeClass("closed");
    $post.find('.repost-form textarea').focus();
    $post.find('.reply-form').addClass("closed");

  },

  setupReply: function (event) {
    event.preventDefault();
    var $post = $(event.currentTarget).closest('.post');
    $post.find('.reply-form').removeClass("closed");
    $post.find('.reply-form textarea').focus();
    $post.find('.repost-form').addClass("closed");

  },

  toggleFavorite: function(event) {
    event.preventDefault();
    var postId = $(event.currentTarget).data("post-id");
    var post = this.posts.getOrFetch(postId);

    var fav_options = {
      user_id: this.currentUser.id,
      favoriteable_type: "Post",
      favoriteable_id: post.id
    }
    var favorites = new Chattr.Collections.Favorites
    favorites.fetch({
      success: function () {
        var fav = favorites.findWhere(fav_options)
        if (fav) {
          fav.destroy();
        } else {
          favorites.create(fav_options)
        }
      }
    })
  }
});
