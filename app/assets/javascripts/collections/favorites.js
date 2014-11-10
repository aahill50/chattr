Chattr.Collections.Favorites = Backbone.Collection.extend({
  model: Chattr.Models.Favorite,

  url: '/api/favorites',
});
