Chattr.Models.Post = Backbone.Model.extend({
  urlRoot: '/api/posts',

  author: function (attrs) {
    if (!this._author) {
      this._author = new Chattr.Models.User(attrs)
    }
    return this._author;
  },
	
	childrenPosts: function () {
		if (!this._childrenPosts) {
			this._childrenPosts = new Chattr.Collections.Posts([], { parent_post_id: this })
		}
		return this._childrenPosts;
	},
	
	favorites: function () {
		if (!this._favorites) {
			this._favorites = new Chattr.Collections.Favorites([], { favoriteable_id: this, favoriteable_type: "Post"})
		}
		return this._favorites
	},

  parse: function (resp) {
    if (resp.children_posts) {
			this.childrenPosts().set(resp.children_posts, { parse: true })
			delete resp.children_posts
    }
    if (resp.author) {
      this.author(resp.author).set(resp.author, { parse: true })
      delete resp.author
    }
    if (resp.favorites) {
      this.favorites().set(resp.favorites, { parse: true })
      delete resp.favorites
    }
    return resp
  },

  formatForRP: function() {
    var content = this.get("content");
    var author = this.get("author_username");
    return "rp-" + author + ": " + content
  }
});
