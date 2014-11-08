Chattr.Views.PostsIndex = Backbone.View.extend({
  initialize: function (options) {
    this.posts = options.posts;
		this.posts.fetch();
   
	  this.favs = new Chattr.Collections.Favorites;
    this.favs.fetch();   
		
    this.listenTo(this.posts, "add remove", this.render);
  },
	
  events: {
    "submit .new-post": "submitNewPost",
    "focus .index-profile .closed": "expandForm",
    "blur form": "closeForm",
    "click button.reply": "setupReply",
    "click button.repost": "setupRepost",
    "keyup .post .new-post": "updateCharCounter",
    "keyup .new-post": "updateProfileCharCounter",
    "click button.favorite": "toggleFavorite",
    "click .delete-post": "deletePost"
  },
	
  template: JST["posts/index"],
	indexProfileTemplate: JST["users/index_profile"],
	postTemplate: JST["posts/post"],

  tagName: 'section',

  id: 'body-bottom',

  render: function () {
    var content = this.template({
      posts: this.posts,
			index_profile: this.indexProfileTemplate,
			postTemplate: this.postTemplate
    });
    this.$el.html(content);
    return this;
  },

  submitNewPost: function (event) {
    event.preventDefault();
    var that = this;
    var $post = $(event.currentTarget).closest('.post');
		var $postCounter = $('.index-profile .post.count a');

    var params = $(event.currentTarget).serializeJSON()['post']
    var post = new Chattr.Models.Post(params)

    post.save([],{
      success: function (data) {
				$postCounter.text( function () {
					return parseInt($postCounter.text()) + 1
				});
        $post.find('.repost-form').addClass("closed");
        $post.find('.reply-form').addClass("closed");
      }
    })
  },

  expandForm: function (event) {
    $(event.currentTarget).removeClass("closed");
  },

  closeForm: function (event) {
		window.setTimeout( function () {
	    $(event.target).closest('form').addClass("closed");
	    var $profile = $(event.target).closest('.index-profile')
	    var $charCounter = $profile.find('.char-counter')
	    $charCounter.text("")
		}, 200);
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
		var $favButton = $(event.currentTarget)
    var post = this.posts.getOrFetch(postId);
    var that = this;
		
    var fav_options = {
      user_id: Chattr.currentUser.id,
      favoriteable_type: "Post",
      favoriteable_id: post.id
    }

		if(post.get("favorited")) {
			var fav = this.favs.get(post.get("favorite_id"))
			fav.destroy({ 
				wait: true,
				success: function() {
					$favButton.text("Favorite")
					that.posts.fetch()
					that.favs.fetch()
				}
			});
		} else {
			this.favs.create(fav_options, { 
				wait: true,
				success: function() {
					$favButton.text("Unfavorite")
					that.posts.fetch();
					that.favs.fetch();
				}
			});
		}
  },

  deletePost: function (event) {
    event.preventDefault();
    var postId = $(event.currentTarget).closest('.post').data('id')
    var post = this.posts.get(postId);
		
		var $postCounter = $('.index-profile .post.count a');
    post.destroy({
    	success: function () {
				console.log($postCounter.text())
				$postCounter.text( function () {
					return parseInt($postCounter.text()) - 1
				});
    	}
    });
  },

  updateCharCounter: function (event) {
    var $post = $(event.target).closest('.post')
    var $charCounter = $post.find('.char-counter')
    var charsLeft = 141 - $(event.target).val().length;
    $charCounter.text(charsLeft + " characters remaining")
  },

  updateProfileCharCounter: function (event) {
    var $profile = $(event.target).closest('.index-profile')
    var $charCounter = $profile.find('.char-counter')
    var charsLeft = 141 - $(event.target).val().length;
    $charCounter.text(charsLeft + " characters remaining")
  }
});
