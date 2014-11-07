module Api
  class PostTagsController < ApiController
    def index
      @post_tags = PostTag.all.includes(:post)
      render :index
    end

    def show
      @post_tag = PostTag.find(params[:id])
      render :show
    end    
  end
end
