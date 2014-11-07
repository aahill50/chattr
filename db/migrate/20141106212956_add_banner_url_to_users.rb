class AddBannerUrlToUsers < ActiveRecord::Migration
  def change
    add_column :users, :banner_url, :string, default: 'https://www.filepicker.io/api/file/1GpBbLckRvi1DWl5wabD'
  end
end
