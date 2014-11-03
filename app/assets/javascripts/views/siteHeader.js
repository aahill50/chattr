Chattr.Views.SiteHeader = Backbone.View.extend ({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  template: JST["shared/site_header"],

  tagName: 'header',

  className: 'site-header group',

  id: 'site-header',

  render: function () {
    var content = this.template({ currentUser: this.model });
    this.$el.html(content);
    return this;
  }
})