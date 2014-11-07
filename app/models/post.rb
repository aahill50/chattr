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

  has_many :tags, class_name: "PostTag", dependent: :destroy
  
  has_many :favorites, as: :favoriteable
  
  after_save :register_hashtags
  
  HASHTAG_REGEX = /(?:\s|^)(?:#(?!\d+(?:\s|$)))(\w+)(?=\s|\?|\.|\!|$)/i
  
  def format_RP(content)
    new_content = "RP-" + self.author._username + " - " + content
    if new_content.length > 141
      new_content = new_content[0..138] + "..."
    end
    new_content
  end
  
  def find_hashtags
    self.content.scan(HASHTAG_REGEX).flatten.uniq
  end
  
  def has_hashtags?
    self.find_hashtags.length > 0
  end
    
  def register_hashtags
    if has_hashtags?
      self.find_hashtags.each do |hashtag|
        hash = Hashtag.find_by(tag: hashtag) || Hashtag.create(tag: hashtag)
        self.tags.create(tag_id: hash.id, user_id: self.author.id)
      end
    end
  end
end
