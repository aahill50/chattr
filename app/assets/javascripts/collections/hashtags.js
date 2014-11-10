Chattr.Collections.Hashtags = Backbone.Collection.extend({
	model: Chattr.Models.Hashtag,
	
	url: 'api/hashtags',
	
  getOrFetch: function (id) {
    var tags = this;
    var tag = tags.get(id);

    if(tag) {
      tag.fetch();
    } else {
      tag = new Chattr.Models.Hashtag({ id: id });
      tag.fetch({
        success: function () {
          tags.add(tag);
        }
      })
    }

    return tag
  },
	
	comparator: function (tag) {
		return -tag.taggedPosts().length;
	}
});