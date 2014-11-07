Chattr.Models.Hashtag = Backbone.Model.extend({
	urlRoot: '/api/hashtags',
	
	taggedPosts: function () {
		if (!this._taggedPosts) {
			this._taggedPosts = new Chattr.Collections.PostTags([], { tag_id: this })
		}
		
		return this._taggedPosts;
	},
	
	parse: function (resp) {
		if (resp.tagged_posts) {
			this.taggedPosts().set(resp.tagged_posts, { parse: true })
			delete resp.tagged_posts
		}
		return resp
	}
})