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

    def create
      @post = current_user.posts.new(post_params)
      if @post.save
        render json: @post
      else
        render json: @post.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
    end

    private
      def post_params
        params.require(:post).permit(:content, :parent_post_id)
      end
  end
end
