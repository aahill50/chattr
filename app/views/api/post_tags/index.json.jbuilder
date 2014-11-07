json.post_tags do
  json.array! @post_tags do |post_tag|
    json.extract! post_tag, :id, :tag_id, :post_id
  end
end