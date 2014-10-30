Chattr.Collections.Posts = Backbone.Collection.extend({
  model: Chattr.Models.Post,

  url: 'api/posts',

  parse: function (resp) {
    console.log(resp)
  },

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
  }
});