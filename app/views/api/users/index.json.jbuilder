json.array! @users do |user|
	json.extract! user, 
		:id, :fullname, :username, :email, :post_count, :follower_count, :following_count,
    :avatar_url, :banner_url, :bio
end