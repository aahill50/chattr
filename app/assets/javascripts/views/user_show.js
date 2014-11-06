Chattr.Views.UserShow = Backbone.CompositeView.extend({
  initialize: function (options) {
		var that = this;
    this.user = options.user;
		this.user.fetch();
		
    this.favs = new Chattr.Collections.Favorites;
    this.posts = options.posts;
		
    this.listenTo(this.user, "sync", this.render);
    this.listenTo(this.posts, "add remove sync", this.render);
    this.listenTo(this.favs, "add remove sync", this.render);
  },

  events: {
    "submit .new-post": "submitNewPost",
    "click button.reply": "setupReply",
    "click button.repost": "setupRepost",
    "click button.favorite": "toggleFavorite",
    "click .delete-post": "deletePost",
    "keyup .reply-form, .repost-form": "updateCharCounter",
		"click .main-user-info .avatar-large": "uploadNewImage"
  },

  template: JST["users/show"],

  tagName: 'main',

  id: 'all-content',

  render: function () {
    var content = this.template({
      user: this.user,
      posts: this.posts
    })

    this.$el.html(content);
    return this;
  },

  submitNewPost: function (event) {
    event.preventDefault();
    var that = this;
    var $post = $(event.currentTarget).closest('.post');

    params = $(event.currentTarget).serializeJSON()['post']
    var post = new Chattr.Models.Post(params)
    post.save([],{
      success: function () {
        that.posts.add(post);
        that.posts.fetch();

        $post.find('.repost-form').addClass("closed");
        $post.find('.reply-form').addClass("closed");
      }
    })
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
    var that = this;

    var fav_options = {
      user_id: Chattr.currentUser.id,
      favoriteable_type: "Post",
      favoriteable_id: post.id
    }

    that.favs.fetch({
      success: function () {
        var fav = that.favs.findWhere(fav_options)
        if (fav) {
          fav.destroy();
        } else {
          that.favs.create(fav_options)
        }
      }
    })
  },

  deletePost: function (event) {
    event.preventDefault();
    var postId = $(event.currentTarget).closest('.post').data('id')
    var post = this.posts.get(postId);
    post.destroy();
  },

  updateCharCounter: function (event) {
    var $post = $(event.target).closest('.post')
    var $charCounter = $post.find('.char-counter')
    var charsLeft = 141 - $(event.target).val().length;
    $charCounter.text(charsLeft + " characters remaining")
  },
	
	uploadNewImage: function () {
		if (this.user.id === Chattr.currentUser.id) {
			var that = this;
		  filepicker.pick(function(blob) {
				that.user.set({"avatar_url": blob.url})
				that.user.save();
		  });
		}
	}
	
});
