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
			this._fav_posts = new Chattr.Collections.Posts(this.get("favorite_posts"), { parse: true })
			this._fav_posts.fetch();
		}
		return this._fav_posts;
	},
	
	followedUsers: function () {
		if (!this._followedUsers) {
			this._followedUsers = new Chattr.Collections.Users(this.get("followed_users"), { parse: true })
		}
		return this._followedUsers;		
	},
	
	followers: function () {
		if (!this._followers) {
			this._followers = new Chattr.Collections.Users(this.get("followers"), { parse: true })
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
		if (resp.followed_users) {
			this.followedUsers().set(resp.followed_users)
			delete resp.followed_users
		}
		if (resp.followers) {
			this.followers().set(resp.followers)
			delete resp.followers
		}
		return resp
	}
});