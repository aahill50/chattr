class User < ActiveRecord::Base
  validates :username, :fullname, :password_digest, :email, :session_token, presence: true
  validates :username, :email, uniqueness: { case_sensitive: false, message: "is not available" }
  validates :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token

  has_many :posts, order: "created_at DESC", inverse_of: :author

  has_many :follows_from_others,
      class_name: "UserFollow",
      foreign_key: :user_id,
      inverse_of: :followed_user

  has_many :follows_to_others,
    class_name: "UserFollow",
    foreign_key: :follower_id,
    inverse_of: :follower

  has_many :followers, through: :follows_from_others, source: :follower

  has_many :followed_users, through: :follows_to_others, source: :followed_user

  has_many :followed_posts, through: :followed_users, source: :posts

  def User.find_by_credentials(username, password)
    user = User.find_by( username: username)
    user && user.is_password?(password) ? user : nil
  end


  def User.search_for(str)
    sql_search_str = "%" + str.downcase + "%"
    User.where(<<-SQL, str: sql_search_str) 
      lower(username) LIKE :str
        OR lower(fullname) LIKE :str
        OR lower(email) = :str
    SQL
  end

  attr_reader :password

  def _username
    "@" + username
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end

  def generate_session_token
    SecureRandom::urlsafe_base64
  end

  def password=(password)
    return nil if password.nil?
    self.password_digest = BCrypt::Password.create(password)
    @password = password
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def follows?(other_user)
    other_user.followers.include?(self)
  end

  def main_feed_posts
    subquery_sql = self.followed_users.select("users.id")

    Post.all.select("posts.*")
      .where(<<-SQL, self.id, subquery_sql ).order("posts.created_at DESC")
        posts.user_id = ? OR posts.user_id IN (?)
      SQL
  end

  def join_date
    self.created_at.to_formatted_s(:short).split.first(2).reverse.join(' ')
  end

  def post_count
    self.posts.count
  end

  def following_count
    self.follows_to_others.count
  end

  def follower_count
    self.follows_from_others.count
  end
end
