# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# User.create(username:"",
#             fullname:"",
#             email:"",
#             bio:"",
#             password:"")
#
# Post.create(content:"",
#             user_id: ,
#             parent_post_id:)
#
# UserFollow.create(user_id: , follower_id: )

10.times do
  fname = Faker::Name.name
  uname = Faker::Internet.user_name(fname)
  eml = Faker::Internet.safe_email(fname)

  User.create(fullname: fname,
              username: uname,
              email: eml,
              bio: Faker::Company.catch_phrase,
              password:"password")
end

User.create(username:"aaron",
            fullname:"Aaron Hill",
            email:"aaron@example.com",
            bio:"I made this!",
            password:"password")

100.times do
  Post.create(content:Faker::Lorem.sentence,
              user_id: (1..11).to_a.sample)
end

30.times do
  uf = UserFollow.new(user_id: (1..11).to_a.sample, follower_id: (1..11).to_a.sample  )
  uf.save unless uf.user_id == uf.follower_id
end

# Post.create(content:"what's the weather like?",
#             user_id: 1)
#
# Post.create(content:"sunny!",
#             user_id: 2,
#             parent_post_id: 1)
#
# Post.create(content:"rainy :(",
#             user_id: 3,
#             parent_post_id: 1)
#
# Post.create(content:"who likes turtles?",
#             user_id: 2)
#
# Post.create(content:"me!",
#             user_id: 5,
#             parent_post_id: 4)
#
# Post.create(content:"cars and windows",
#             user_id: 4)
#
# Post.create(content:"raindrops and lollipops",
#             user_id: 3,
#             parent_post_id: 6)
#
# Post.create(content:"eat ALL the things",
#             user_id: 4)
#
# Post.create(content:"pizza.",
#             user_id: 5)

