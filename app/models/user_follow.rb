class UserFollow < ActiveRecord::Base
  validates :followed_user, uniqueness: {scope: :follower}
  belongs_to :followed_user,
    class_name: "User",
    foreign_key: :user_id,
    inverse_of: :follows_from_others

  belongs_to :follower,
    class_name: "User",
    foreign_key: :follower_id,
    inverse_of: :follows_to_others

end