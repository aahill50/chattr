json.users do
  json.array! @found_users do |user|
    json.extract! user, :id, :_username
  end
end

json.hashtags do
  json.array! @found_hashtags do |hashtag|
    json.extract! hashtag, :id, :tag 
    json.posts hashtag.tagged_posts do |post|
      json.extract! post, :id
    end
  end
end
