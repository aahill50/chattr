require 'rails_helper'
require 'spec_helper'
require 'shoulda/matchers'

RSpec.describe Post, :type => :model do
  it { should validate_presence_of :content }
  it { should validate_presence_of :user_id }

  it { should have_many :children_posts }
  it { should belong_to :parent_post }
end
