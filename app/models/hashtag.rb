class Hashtag < ActiveRecord::Base
  has_many :tags, class_name: "PostTag", foreign_key: :tag_id 
  has_many :tagged_posts, through: :tags, source: :post
end
