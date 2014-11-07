def followed_by_current_user?
  @user.followers.include?(current_user)
end

def follow_from_current_user
  follow = @user.follows_from_others.find {|follow| follow.follower_id == current_user.id}
  follow ? follow.id : nil
end

json.extract! @user, 
	:id, :fullname, :_username, :email, 
  :post_count, :follower_count, :following_count, 
  :join_date, :bio, :avatar_url, :banner_url, :follows_from_others, :follows_to_others,
  :hashtag_posts
  
json.is_followed_by_current_user followed_by_current_user?
json.follow_from_current_user follow_from_current_user

json.posts do
	json.array! @user.posts do |post|
		json.extract! post, :id, :content
	end
end

