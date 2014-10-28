class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.text :content
      t.integer :user_id
      t.integer :parent_post_id

      t.timestamps
    end
    
    add_index :posts, :user_id
    add_index :posts, :parent_post_id
  end
end
