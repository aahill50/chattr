require 'rails_helper'
require 'spec_helper'
require 'shoulda/matchers'

RSpec.describe Favorite, :type => :model do
  it { should validate_presence_of :user_id }
  it { should validate_presence_of :favoriteable_type }
  it { should validate_presence_of :favoriteable_id }

  it { should belong_to :favoriteable }
end
