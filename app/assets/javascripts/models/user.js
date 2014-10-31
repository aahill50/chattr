Chattr.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',

  _username: function () {
    return "@" + this.get("username")
  }
});