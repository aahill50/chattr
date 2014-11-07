module Api
  class HashtagsController < ApiController
    def index
      @hashtags = Hashtag.all.includes(:tagged_posts)
      render :index
    end

    def show
      @hashtag = Hashtag.includes(:tagged_posts).find(params[:id])
      render :show
    end

    def create
      @favorite = Favorite.new(favorite_params)
      current_user.favorites.create(favorite_params)
      render json: @favorite
    end

    def destroy
      @favorite = Favorite.find(params[:id])
      current_user.favorites.destroy(@favorite)
      render json: @favorite
    end

    private
    def favorite_params
      params.permit(:favoriteable_type, :favoriteable_id)
    end
  end
end
