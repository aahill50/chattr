class User < ActiveRecord::Base
  validates :username, :fullname, :password_digest, :email, :session_token, presence: true
  validates :username, :email, uniqueness: { case_sensitive: false, message: "is not available" }
  validates :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token

  has_many :posts, inverse_of: :author, order: "created_at DESC"

  def User.find_by_credentials(username, password)
    user = User.find_by( username: username)
    user && user.is_password?(password) ? user : nil
  end

  attr_reader :password

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
end
