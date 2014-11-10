class PostTag < ActiveRecord::Base
  belongs_to :post
  belongs_to :user
  belongs_to :hashtag, foreign_key: :tag_id
  
  def self.most_popular
    PostTag.select("post_tags.tag_id, COUNT(post_tags.id) AS tag_count")
    .group("post_tags.tag_id")
    .order("tag_count DESC")
    .limit(5)
  end
end
