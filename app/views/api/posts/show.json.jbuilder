json.id @post.id
json.content @post.content
json.author_fullname @post.author.fullname
json.author_username @post.author._username
json.favorites @post.favorites
json.favorited current_user.favorited?(@post)
