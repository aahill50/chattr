require 'rails_helper'
require 'spec_helper'
require 'shoulda/matchers'

RSpec.describe Post, :type => :model do
  it { should ensure_length_of(:content).is_at_least(2) }
  it { should ensure_length_of(:content).is_at_most(141) }
  it { should validate_presence_of :user_id }

  it { should have_many :children_posts }
  it { should belong_to :parent_post }

  it { should belong_to :author }
end
