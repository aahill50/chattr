json.extract! @user, 
	:id, :fullname, :username, :email, 
  :post_count, :follower_count, :following_count, 
  :join_date, :bio, :avatar_url
	
json.posts do
	json.array! @user.posts do |post|
		json.extract! post, :id, :content
	end
end

