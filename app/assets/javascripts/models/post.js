Chattr.Models.Post = Backbone.Model.extend({
  urlRoot: '/api/posts',

  author: function (attrs) {
    // console.log(attrs)
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

  parse: function (resp) {
		// debugger
  //   console.log("debugging post mode")
    if (resp.children_posts) {
			this.childrenPosts().set(resp.children_posts, { parse: true })
			delete resp.children_posts
    }
    if (resp.author) {
      this.author(resp.author).set(this._author, { parse: true })
      delete resp.author
    }
    return resp
  },

  formatForRP: function() {
    var content = this.get("content");
    var author = this.get("author_username");
    return "rp-" + author + ": " + content
  }
});
