class RenameFollowers < ActiveRecord::Migration
  def change
    rename_table :followers, :user_follows
  end
end
