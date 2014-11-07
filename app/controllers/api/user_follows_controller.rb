module Api
  class UserFollowsController < ApiController
    def create
      user_id = params[:follow][:user_id]
      follower_id = params[:follow][:follower_id]
      
      @follow = UserFollow.create(user_id: user_id, follower_id: follower_id)
      render json: @follow
    end

    def destroy
      @follow = UserFollow.find(params[:id])
      UserFollow.destroy(@follow)
      render json: @follow
    end
  end
end
