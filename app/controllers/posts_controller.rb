class PostsController < ApplicationController
  before_filter :require_signed_in!

  def index
    @posts = current_user.main_feed_posts.order("created_at DESC")
    render :index
  end

  def new
    @post = current_user.posts.new
    render :new
  end

  def reply
    @post = current_user.posts.new
    @post.parent_post_id = params[:post][:parent_post_id]
    render :new
  end

  def create
    post = current_user.posts.new(post_params)

    if current_user.save
      redirect_to posts_url
    else
      flash[:errors] = post.errors.full_messages
      @posts = Post.where(user_id: current_user.id)
      render :index
    end
  end

  def show
    @post = Post.find_by(id: params[:id])

    if @post
      render :show
    else
      flash[:errors] = ["Post not found"]
      redirect_to :root
    end
  end

  private
  def post_params
    params.require(:post).permit(:content, :user_id, :parent_post_id)
  end
end
