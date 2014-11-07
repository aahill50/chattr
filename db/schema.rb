# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141106232759) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "favorites", force: true do |t|
    t.integer  "user_id"
    t.integer  "favoriteable_id"
    t.string   "favoriteable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "hashtags", force: true do |t|
    t.string   "tag"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "hashtags", ["tag"], name: "index_hashtags_on_tag", using: :btree

  create_table "post_tags", force: true do |t|
    t.integer  "tag_id"
    t.integer  "post_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "post_tags", ["tag_id", "post_id"], name: "index_post_tags_on_tag_id_and_post_id", using: :btree
  add_index "post_tags", ["tag_id", "user_id"], name: "index_post_tags_on_tag_id_and_user_id", using: :btree

  create_table "posts", force: true do |t|
    t.text     "content"
    t.integer  "user_id"
    t.integer  "parent_post_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "posts", ["parent_post_id"], name: "index_posts_on_parent_post_id", using: :btree
  add_index "posts", ["user_id"], name: "index_posts_on_user_id", using: :btree

  create_table "user_follows", force: true do |t|
    t.integer  "follower_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_follows", ["follower_id"], name: "index_user_follows_on_follower_id", using: :btree
  add_index "user_follows", ["user_id"], name: "index_user_follows_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "username"
    t.string   "fullname"
    t.string   "email"
    t.string   "bio"
    t.string   "password_digest"
    t.string   "session_token"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar_url",      default: "https://www.filepicker.io/api/file/CbNGAq3fQjyWZIrQX311"
    t.string   "banner_url",      default: "https://www.filepicker.io/api/file/x92QksnQB6Pj6oJz3l6E"
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree

end
