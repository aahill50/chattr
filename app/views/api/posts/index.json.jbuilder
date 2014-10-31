json.array! @posts do |post|
  json.extract! post, :content, :author
  json.timestamp time_ago_in_words(post.created_at) + " ago"
end
