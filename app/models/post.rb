class Post < ActiveRecord::Base
  validates :content, length: { minimum: 2, maximum: 141 }
  validates :user_id, presence: true

  belongs_to :author,
    class_name: "User",
    foreign_key: :user_id,
    inverse_of: :posts

  belongs_to :parent_post,
    class_name: "Post",
    inverse_of: :children_posts

  has_many :children_posts,
    class_name: "Post",
    foreign_key: :parent_post_id,
    inverse_of: :parent_post
end
