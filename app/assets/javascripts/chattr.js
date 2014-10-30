window.Chattr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // Backbone.current_user = current_us
    new Chattr.Routers.AppRouter();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Chattr.initialize();
});
