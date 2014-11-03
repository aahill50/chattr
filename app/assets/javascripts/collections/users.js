Chattr.Collections.Users = Backbone.Collection.extend({
  model: Chattr.Models.User,

  url: '/api/users',

  getOrFetch: function (id) {
    var users = this;
    var user = users.get(id);

    if (user) {
      user.fetch();
    } else {
      user = new Chattr.Models.User({ id: id });
      user.fetch({
        success: function () {
          users.add(user);
        }
      });
    }

    return user;
  }
});