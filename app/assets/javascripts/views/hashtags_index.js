Chattr.Views.HashtagsIndex = Backbone.View.extend({
	initialize: function (options) {
		this.tags = options.tags;
		this.tags.fetch()
		
		this.listenTo(this.tags, "all", this.render)
		this.listenTo(Chattr.currentUser, "sync", this.render)
	},
	
	tagName: 'section',
	id: 'body-bottom',
	
  template: JST["hashtags/index"],
	indexProfileTemplate: JST["users/index_profile"],

  render: function () {
    var content = this.template({
			tags: this.tags,
			index_profile: this.indexProfileTemplate
		})
    this.$el.html(content)
    return this;
  }
});

