class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :fullname
      t.string :email
      t.string :bio
      t.string :password_digest
      t.string :session_token

      t.timestamps
    end
    
    add_index :users, :email
    add_index :users, :session_token
  end
end
