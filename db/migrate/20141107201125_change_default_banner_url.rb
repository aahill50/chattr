class ChangeDefaultBannerUrl < ActiveRecord::Migration
  def change
    remove_column :users, :banner_url
    add_column :users, :banner_url, :string, default: 'https://www.filepicker.io/api/file/pGE7Cl35RXeBXcc5yxGQ' 
  end
end
