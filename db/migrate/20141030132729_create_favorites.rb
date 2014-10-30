class CreateFavorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.integer :user_id
      t.references :favoriteable, polymorphic: true

      t.timestamps
    end
  end
end
