Chattr.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  _username: function () {
    return "@" + this.get("username")
  },
	
	posts: function () {
		if (!this._posts) {
			this._posts = new Chattr.Collections.Posts({ user_id: this.id })
		}
		return this._posts;
	},
	
	parse: function (resp) {
		if (resp.posts) {
			this.posts().set(resp.posts)
			delete resp.posts
		}
		return resp
	}
});