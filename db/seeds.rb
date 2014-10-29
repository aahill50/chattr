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

User.create(username:"user1",
            fullname:"User One",
            email:"userone@example.com",
            bio:"I am user one!",
            password:"password")

User.create(username:"user2",
            fullname:"User Two",
            email:"usertwo@example.com",
            bio:"User Two checking in!",
            password:"password")

User.create(username:"user3",
            fullname:"User Three",
            email:"userthree@example.com",
            bio:"Hey there! It's User Three!",
            password:"password")

User.create(username:"user4",
            fullname:"User Four",
            email:"userfour@example.com",
            bio:"I am User #4.",
            password:"password")

User.create(username:"user5",
            fullname:"user five",
            email:"userfive@example.com",
            bio:"i like turtles",
            password:"password")

Post.create(content:"what's the weather like?",
            user_id: 1)

Post.create(content:"sunny!",
            user_id: 2,
            parent_post_id: 1)

Post.create(content:"rainy :(",
            user_id: 3,
            parent_post_id: 1)

Post.create(content:"who likes turtles?",
            user_id: 2)

Post.create(content:"me!",
            user_id: 5,
            parent_post_id: 4)

Post.create(content:"cars and windows",
            user_id: 4)

Post.create(content:"raindrops and lollipops",
            user_id: 3,
            parent_post_id: 6)

Post.create(content:"eat ALL the things",
            user_id: 4)

Post.create(content:"pizza.",
            user_id: 5)

