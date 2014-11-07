json.array! @hashtags do |hashtag|
  json.array! hashtag.tagged_posts do |post|
    json.extract! post, :id, :content
  end
end

