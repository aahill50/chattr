module Api
  class PostsController < ApiController
    def index
      @posts = current_user.main_feed_posts
      render :index
    end

    def show
      @post = Post.includes(:author).find(params[:id])
      render :show
    end
  end
end