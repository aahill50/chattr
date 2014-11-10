Chattr.Models.Hashtag = Backbone.Model.extend({
	urlRoot: '/api/hashtags',
	
	taggedPosts: function (tagged_posts) {
		if (!this._taggedPosts) {
			this._taggedPosts = new Chattr.Collections.PostTags(tagged_posts)
		}
		return this._taggedPosts;
	},
	
	parse: function (resp) {
		if (resp.tagged_posts) {
			this.taggedPosts(resp.tagged_posts).set(resp.tagged_posts, { parse: true })
			delete resp.tagged_posts
		}
		return resp
	}
})