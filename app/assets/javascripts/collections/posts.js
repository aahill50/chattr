Chattr.Collections.Posts = Backbone.Collection.extend({
  model: Chattr.Models.Post,

  url: '/api/posts',


  getOrFetch: function (id) {
    var posts = this;
    var post = posts.get(id);

    if(post) {
      post.fetch();
    } else {
      post = new Chattr.Models.Post({ id: id });
      post.fetch({
        success: function () {
          posts.add(post);
        }
      })
    }

    return post
  },

  comparator: function (post) {
    return -Date.parse(post.get("created_at"));
  }
});
