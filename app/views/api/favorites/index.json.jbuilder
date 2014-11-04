json.array! @favorites do |favorite|
  json.extract! favorite, :id, :user_id, :favoriteable_type, :favoriteable_id
end
