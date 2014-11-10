class Hashtag < ActiveRecord::Base
  validates :tag, uniqueness: true
  validates :tag, presence: true
  
  has_many :tags, class_name: "PostTag", foreign_key: :tag_id,
           dependent: :destroy, after_remove: :delete_if_no_more_posts
  has_many :tagged_posts, through: :tags, source: :post
  
  def Hashtag.search_for(str)
    sql_search_str = "%" + str.downcase + "%"
    Hashtag.where(<<-SQL, str: sql_search_str)
      lower(tag) LIKE :str
    SQL
  end
  
  def delete_if_no_more_posts 
    self.destroy() if self.tagged_posts.count == 0
  end
end
