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

  has_many :tags, class_name: "PostTag"
  
  has_many :favorites, as: :favoriteable
  

  def format_RP(content)
    new_content = "RP-" + self.author._username + " - " + content
    if new_content.length > 141
      new_content = new_content[0..138] + "..."
    end
    new_content
  end
  
  def parse_hashtags
    self.content.scan(/(#[\w+\S]+)/).flatten
  end
  
  def hashtagged_words_indices
    hashtagged_words = self.parse_hashtags
    content_as_arr = self.content.split(' ')
    indices = [];
    
    p content_as_arr
    hashtagged_words.each do |tag_word|
    p tag_word
      indices += content_as_arr.each_index.select { |i| content_as_arr[i] == tag_word }
    end
    indices
  end
end
