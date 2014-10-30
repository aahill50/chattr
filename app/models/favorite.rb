class Favorite < ActiveRecord::Base
  validates :user_id, :favoriteable_id, :favoriteable_type, presence: true

  belongs_to :favoriteable, polymorphic: true
end
