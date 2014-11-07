Chattr.Views.SessionNew = Backbone.View.extend({
	template: JST["sessions/new"],

	events: {
		"submit form.sign-in": "signIn"
	},

	tagName: 'main',

	id: 'all-content',

	signIn: function (event) {
		event.preventDefault();
		params = $(event.currentTarget).serializeJSON();

		$.ajax({
			url: "/api/session",
			type: "post",
			data: params,
			dataType: "json",
			success: function (data) {
				Chattr.currentUser = Chattr.Collections.users.get(data.id);
				Chattr.currentUser.fetch();
				Backbone.history.navigate("/posts", { trigger: true })
			},
			error: function () {
				console.log("error logging in")
			}
		})
	},

	render: function () {
		var content = this.template();
		this.$el.html(content);
		return this;
	}
});
