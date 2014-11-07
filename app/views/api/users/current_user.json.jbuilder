 json.extract! current_user, :id, :fullname, :_username, :email,
                             :post_count, :follower_count, :following_count,
                             :bio, :join_date, :avatar_url, :banner_url

json.followed_users do                              
  json.array! current_user.followed_users do |user|
    json.id user.id
  end
end