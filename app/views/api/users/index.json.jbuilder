json.array! @users do |user|
	json.extract! user, 
		:id, :fullname, :username, :email, :post_count, :follower_count, :following_count
end