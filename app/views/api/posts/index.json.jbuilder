json.array! @posts do |post|
  json.extract! post, :id, :content, :author, :favorites
  json.author_username post.author._username
  json.timestamp time_ago_in_words(post.created_at) + " ago"
end
