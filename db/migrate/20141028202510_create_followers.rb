class CreateFollowers < ActiveRecord::Migration
  def change
    create_table :followers do |t|
      t.integer :follower_id
      t.integer :user_id

      t.timestamps
    end

    add_index :followers, :follower_id
    add_index :followers, :user_id
  end
end
