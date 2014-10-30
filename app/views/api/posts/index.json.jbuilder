@posts.each do |post|
  json.content post.content
  json.author_fullname post.author.fullname
  json.author_username post.author.username
  json.timestamp post.author.fullname
  json.content post.content
end