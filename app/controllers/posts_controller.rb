class PostsController < ApplicationController
  def index
    @posts = current_user.posts
    render :index
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

  private
  def post_params
    params.require(:post).permit(:content, :user_id, :parent_post_id)
  end
end
