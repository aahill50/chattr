class AddBannerUrlToUsers < ActiveRecord::Migration
  def change
    add_column :users, :banner_url, :string, default: 'https://www.filepicker.io/api/file/x92QksnQB6Pj6oJz3l6E'
  end
end
