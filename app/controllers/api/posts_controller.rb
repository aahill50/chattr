class Api::PostsController < ApplicationController
  def index
    @posts = Post.all
    render :index
  end

  def show
    @post = Post.includes(:author).find(params[:id])
    render :show
  end
end