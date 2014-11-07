Chattr.Views.UserNew = Backbone.View.extend({
	initialize: function (options) {
		this.user = options.user
	},
	
	template: JST["users/new"],
	
	tagName: 'main',

	id: 'all-content',
	
	render: function () {
		console.log("attempting to render....")
		var content = this.template({
			user: this.user
		});
		this.$el.html(content);
		return this;
	}
})