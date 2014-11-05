Chattr.Views.SiteHeader = Backbone.View.extend ({
  initialize: function () {
    if (this.model) {
      this.listenTo(this.model, "sync", this.render)
    }

  },

	events: {
		"click .sign-out": "signOut"
	},

  template: function(options) {

    if (options.currentUser) {
      return JST["shared/site_header"]({currentUser: options.currentUser})
    } else {
      return JST["shared/site_header_unsigned"]
    }

  },

  tagName: 'header',

  className: 'site-header group',

  id: 'site-header',

  render: function () {
    if (this.model) {
      var content = this.template({ currentUser: this.model });
    } else {
      var content = this.template({ currentUser: null });
    }
    this.$el.html(content);
    return this;
  },

	signOut: function (event) {
		event.preventDefault();

		$.ajax({
			type: 'DELETE',
			url: 'api/session',
			dataType: "text",
			success: function () {
				Backbone.history.navigate("/session/new", { trigger: true })
			}
		})
	},

})
