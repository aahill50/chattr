class Hashtag < ActiveRecord::Base
  validates :tag, uniqueness: true
  validates :tag, presence: true
  
  has_many :tags, class_name: "PostTag", foreign_key: :tag_id, dependent: :destroy
  has_many :tagged_posts, through: :tags, source: :post
  
  def Hashtag.search_for(str)
    sql_search_str = "%" + str.downcase + "%"
    Hashtag.where(<<-SQL, str: sql_search_str)
      lower(tag) LIKE :str
    SQL
  end
end
