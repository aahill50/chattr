Chattr.Views.IndexProfile = Backbone.View.extend({
  template: JST["index/profile"],

  render: function () {
    var content = this.template({ current_user: this.model });
    this.$el.html(content);
    return this;
  }
})