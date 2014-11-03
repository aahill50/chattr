window.Chattr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Chattr.Routers.AppRouter();
    var posts = new Chattr.Collections.Posts;
    posts.fetch({
      success: function () {
        Backbone.history.start();
      }
    })
  }
};

$(document).ready(function(){
  Chattr.initialize();
});

