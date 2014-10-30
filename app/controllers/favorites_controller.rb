class FavoritesController < ApplicationController
  def index
    @favorites = current_user.favorites
    render :index
  end

  def create
    current_user.favorites.create(favorite_params)
    redirect_to posts_url
  end

  def destroy
    fail
  end

  private
  def favorite_params
    params.require(:fav).permit(:favoriteable_type, :favoriteable_id)
  end
end
