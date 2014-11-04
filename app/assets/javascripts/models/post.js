Chattr.Models.Post = Backbone.Model.extend({
  urlRoot: '/api/posts',

  author: function (attrs) {
    // console.log(attrs)
    if (!this._author) {
      this._author = new Chattr.Models.User(attrs)
    }
    return this._author;
  },

  parse: function (resp) {
  //   console.log("debugging post mode")
    if (resp.favorites) {
    }
    if (resp.author) {
      this.author(resp.author).set(this._author, { parse: true })
      delete resp.author
    }
    return resp
  },

  formatForRP: function() {
    var content = this.get("content");
    var author = this.get("author_username");
    return "rp-" + author + ": " + content
  }
});
