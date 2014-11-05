Chattr.Views.SiteHeader = Backbone.View.extend ({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

	events: {
		"click .sign-out": "signOut"
	},
	
  template: JST["shared/site_header"],

  tagName: 'header',

  className: 'site-header group',

  id: 'site-header',

  render: function () {
    var content = this.template({ currentUser: this.model });
    this.$el.html(content);
    return this;
  },
	
	signOut: function (event) {
		event.preventDefault();
		
		$.ajax({
			type: 'DELETE',
			url: 'api/session',
			dataType: "json",
			complete: function () {
				Backbone.history.navigate("#signin", { trigger: true })
			}
		})
	},
	
})