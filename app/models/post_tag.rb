class PostTag < ActiveRecord::Base
  belongs_to :post
  belongs_to :user
  belongs_to :hashtag, foreign_key: :tag_id
end
