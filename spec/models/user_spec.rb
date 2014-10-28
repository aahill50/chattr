require 'rails_helper'
require 'spec_helper'
require 'shoulda/matchers'

RSpec.describe User, :type => :model do
  it { should validate_presence_of :username }
  it { should validate_presence_of :fullname }
  it { should validate_presence_of :email }
  it { should validate_presence_of :password_digest }
  it { should validate_presence_of :session_token }
  it { should ensure_length_of(:password).is_at_least(6) }
  it { should validate_uniqueness_of(:username).case_insensitive
    .with_message("is not available") }
  it { should validate_uniqueness_of(:email).case_insensitive
    .with_message("is not available") }
  it { should validate_uniqueness_of :session_token}
  it { should have_many(:posts)}

  # Old Unit Tests
  # describe 'user' do
  #   before(:all) { User.destroy_all }
  #   good_user = create_user("Joe", "password", "Joe", "joe@joe.com")
  #
  #
  #
  #   describe 'is valid' do
  #     it 'with proper username and password' do
  #       expect(good_user).to be_valid
  #     end
  #   end
  #
  #   describe 'is not valid' do
  #     it 'with improper password' do
  #       bad_user = create_user("Jim", "camel", "Jim", "jim@jim.com")
  #       expect(bad_user).to_not be_valid
  #     end
  #
  #     it 'with blank password' do
  #       bad_user = create_user("Jim", "", "Jim", "jim@jim.com")
  #       expect(bad_user).to_not be_valid
  #     end
  #
  #     it 'with blank fullname' do
  #       bad_user = create_user("Jim", "password", "", "jim@jim.com")
  #       expect(bad_user).to_not be_valid
  #     end
  #
  #     it 'with blank email' do
  #       bad_user = create_user("Jim", "password", "Jim", "")
  #       expect(bad_user).to_not be_valid
  #     end
  #
  #     it 'with repeated username' do
  #       good_user = create_user("Joe", "password", "Joe", "joe@joe.com")
  #       repeat_user = create_user("Joe", "password", "Joe 2", "joe2@joe.com")
  #       expect(repeat_user).to_not be_valid
  #     end
  #
  #     it 'with repeated email' do
  #       good_user = create_user("Joe", "password", "Joe", "joe@joe.com")
  #       repeat_user = create_user("Joe Two", "password", "Joe 2", "joe@joe.com")
  #       expect(repeat_user).to_not be_valid
  #     end
  #   end
  #
  #   describe 'valid users' do
  #     good_user = create_user("Joe", "password", "Joe", "joe@joe.com")
  #
  #     describe 'session tokens' do
  #       it 'should have a session token' do
  #         expect(good_user.session_token).to_not be_nil
  #       end
  #
  #       it 'should be able to reset a session token' do
  #         old_token = good_user.session_token
  #         good_user.reset_session_token!
  #         expect(good_user.session_token).to_not be_nil
  #         expect(good_user.session_token).to_not eq(old_token)
  #       end
  #     end
  #   end
  # end
end
