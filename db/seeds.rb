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

User.create(username:"aaron",
            fullname:"Aaron Hill",
            email:"aaron@example.com",
            bio:"I made this!",
            password:"password")

USER_COUNT = 10
POST_COUNT = 10
FOLLOW_COUNT = 0
BIO_STARTS = ["I like to ", "I believe we need to ", "I should probably ",
              "I'm from a place where they like to ", "I don't know much about how to ",
              "I would never ", "My passion is to ", "I can't ", "I should ",
              "Every now and then, it's nice to "]
BIO_ENDS = [".", "...", "!", "!!!", "\n ~Unknown", "\n ~Anon", "\n :)"]

(USER_COUNT - 1).times do
  fname = Faker::Name.name
  uname = Faker::Internet.user_name(fname)
  eml = Faker::Internet.safe_email(fname)

  User.create(fullname: fname,
              username: uname,
              email: eml,
              bio: BIO_STARTS.sample + Faker::Company.bs + (BIO_ENDS + ["\n~#{fname}"]).sample,
              password:"password",
              avatar_url: Faker::Avatar.image)
end

POST_COUNT.times do
  Post.create(content:Faker::Hacker.say_something_smart,
              user_id: (1..USER_COUNT).to_a.sample)
end

FOLLOW_COUNT.times do
  uf = UserFollow.new(user_id: (1..USER_COUNT).to_a.sample,
                      follower_id: (1..USER_COUNT).to_a.sample )
  uf.save unless uf.user_id == uf.follower_id
end