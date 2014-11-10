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
	
	favoritePosts: function () {
		if (!this._fav_posts) {
			this._fav_posts = new Chattr.Collections.Favorites({ user_id: this.id })
		}
		return this._fav_posts;
	},
	
	followedUsers: function () {
		if (!this._followedUsers) {
			this._followedUsers = new Chattr.Collections.Users(this.get("follows_to_others"), { parse: true })
		}
		return this._followedUsers;		
	},
	
	followers: function () {
		if (!this._followers) {
			this._followers = new Chattr.Collections.Users(this.get("follows_from_others"), { parse: true })
		}
		return this._followers;			
	},
	
	parse: function (resp) {
		if (resp.posts) {
			this.posts().set(resp.posts)
			delete resp.posts
		}
		if (resp.favorite_posts) {
			this.favoritePosts().set(resp.favorite_posts)
			delete resp.favorite_posts
		}
		if (resp.follows_to_others) {
			this.followedUsers().set(resp.follows_to_others)
			delete resp.follows_to_others
		}
		if (resp.follows_from_others) {
			this.followers().set(resp.follows_from_others)
			delete resp.follows_from_others
		}
		return resp
	}
});