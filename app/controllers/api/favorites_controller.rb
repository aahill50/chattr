module Api
  class FavoritesController < ApiController
    def index
      @favorites = current_user.favorites
      render :index
    end

    def show
      @favorite = Favorite.find(params[:id])
      render :show
    end

    def create
      @favorite = Favorite.new(favorite_params)
      current_user.favorites.create(favorite_params)
      render text: "fav created"
    end

    def destroy
      @favorite = Favorite.find(params[:id])
      current_user.favorites.destroy(@favorite)
      render text: "fav destroyed"
    end

    private
    def favorite_params
      params.permit(:favoriteable_type, :favoriteable_id)
    end
  end
end
