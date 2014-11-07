module Api
  class PostsController < ApiController
    def index
      @posts = current_user.main_feed_posts.includes(:favorites)
      render :index
    end

    def show
      @post = Post.includes(:author, :favorites).find(params[:id])
      render :show
    end

    def create
      @post = current_user.posts.new(post_params)
      if @post.save
        render partial: 'api/posts/post', locals: { post: @post }
      else
        render json: @post.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @post = current_user.posts.find(params[:id])
      current_user.posts.destroy(@post)
      render text: "post has been deleted"
    end

    private
      def post_params
        params.require(:post).permit(:content, :parent_post_id)
      end
  end
end
