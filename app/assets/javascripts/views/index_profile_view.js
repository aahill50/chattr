Chattr.Views.IndexProfile = Backbone.View.extend({
  template: JST["index/profile"],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
})