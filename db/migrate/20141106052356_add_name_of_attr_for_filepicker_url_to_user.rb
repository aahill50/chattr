class AddNameOfAttrForFilepickerUrlToUser < ActiveRecord::Migration
  def change
    add_column :users, :avatar_url, :string, default: 'https://www.filepicker.io/api/file/CbNGAq3fQjyWZIrQX311'
  end
end
