Chattr.Collections.Posts = Backbone.Collection.extend({
  model: Chattr.Models.Post,

  url: 'api/posts',

  // feed_posts: function (posts) {
  //   console.log(posts)
  //   if (!this._feed_posts) {
  //     this._feed_posts = new Chattr.Collections.Posts(posts)
  //   }
  //   return this._feed_posts
  // },
  //
  // current_user: function (cu) {
  //   if (!this._current_user) {
  //     this._current_user = new Chattr.Models.User(cu);
  //   }
  //   return this._current_user;
  // },

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