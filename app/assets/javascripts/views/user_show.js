Chattr.Views.UserShow = Backbone.CompositeView.extend({
  initialize: function (options) {
		var that = this;
    this.user = options.user;
		this.user.fetch();
		
    this.favs = new Chattr.Collections.Favorites;
    this.posts = this.user.posts();
		this.posts.fetch();
		
    this.listenTo(this.user, "change:avatar_url sync", this.render);
    this.listenTo(this.posts, "add remove", this.render);
  },

  events: {
    "submit .new-post": "submitNewPost",
    "click button.reply": "setupReply",
    "click button.repost": "setupRepost",
		"blur form": "closeForm",
    "click button.favorite": "toggleFavorite",
    "click .delete-post": "deletePost",
    "keyup .reply-form, .repost-form": "updateCharCounter",
		"click .main-user-info .avatar-large": "uploadNewImage",
		"click #user-follow": "toggleFollow"
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
        that.user.posts().add(post);
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

  closeForm: function (event) {
		window.setTimeout( function () {
	    $(event.target).closest('form').addClass("closed");
	    var $profile = $(event.target).closest('.index-profile')
	    var $charCounter = $profile.find('.char-counter')
	    $charCounter.text("")
		}, 200);
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

		if(post.get("favorited")) {
			var fav = this.favs.get(post.get("favorite_id"))
			fav.destroy({ 
				wait: true,
				success: function() {
					that.posts.fetch()
					that.favs.fetch()
				}
			});
		} else {
			this.favs.create(fav_options, { 
				wait: true,
				success: function() {
					that.posts.fetch();
					that.favs.fetch();
				}
			});
		}
  },
	
  toggleFollow: function(event) {
    event.preventDefault();
    var that = this;

    var follow_options = { 
			follow: {
	      user_id: that.user.id,
	      follower_id: Chattr.currentUser.id
			}
    }

		if(this.user.get("is_followed_by_current_user")) {
			$.ajax({
				url: '/api/user_follows/' + that.user.get("follow_from_current_user"),
				type: "DELETE",
				data: follow_options,
				success: function () {
					that.user.fetch();
				},
				error: function () {
					console.log("error unfollowing...")
				}
			})
		} else {
			$.ajax({
				url: '/api/user_follows',
				type: "POST",
				data: follow_options,
				success: function () {
					that.user.fetch();
				},
				error: function () {
					console.log("error following...")
				}
			})
		}
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
