def get_fav_id(post)
  fav = Favorite.find_by({
    user_id: current_user.id,
    favoriteable_type: "Post",
    favoriteable_id: post.id
  })

  fav ? fav.id : nil
end

json.extract! post, :id, :content, :author, :favorites, :created_at
json.author_username post.author._username
json.timestamp time_ago_in_words(post.created_at) + " ago"
json.favorited current_user.favorited?(post)
json.favorite_id get_fav_id(post)
