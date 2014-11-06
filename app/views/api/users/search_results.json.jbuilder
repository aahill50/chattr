json.array! @found_users do |user|
  json.extract! user, :id, :_username
end
