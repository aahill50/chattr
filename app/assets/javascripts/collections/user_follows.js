Chattr.Collections.UserFollows = Backbone.Collection.extend({
	model: Chattr.Models.UserFollow,
	
	url: 'api/user_follows'
})