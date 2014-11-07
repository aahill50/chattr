json.array! @hashtags do |hashtag|
  json.extract! hashtag, :id, :tag
  json.tagged_posts do
    json.array! hashtag.tagged_posts do |post|
      json.extract! post, :id, :content
    end
  end
end

