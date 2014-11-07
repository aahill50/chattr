def get_fav_id(post)
  fav = Favorite.find_by({
    user_id: current_user.id,
    favoriteable_type: "Post",
    favoriteable_id: post.id
  })

  fav ? fav.id : nil
end

json.id @post.id
json.content @post.content
json.author_fullname @post.author.fullname
json.author_username @post.author._username
json.favorites @post.favorites
json.favorited current_user.favorited?(@post)
json.favorite_id get_fav_id(@post)
