Chattr.Views.HashtagsIndex = Backbone.View.extend({
	initialize: function (options) {
		this.tags = options.tags;
		
		this.listenTo(this.tags, "sync", this.render)
		this.listenTo(Chattr.currentUser, "sync", this.render)
	},
	
  template: JST["hashtags/index"],

  render: function () {
    var content = this.template({
			tags: this.tags
		})
    this.$el.html(content)
    return this;
  }
});

