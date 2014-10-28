class UserFollowsController < ApplicationController
  def create
    user_to_follow = User.find(params[:user_follow][:user_id])
    UserFollow.create(follower_id: current_user.id, user_id: user_to_follow.id )
    redirect_to user_url(user_to_follow)
  end

  def destroy
    user_to_unfollow = User.find(params[:user_follow][:user_id])
    follow = UserFollow.find_by(user_id: user_to_unfollow.id,
      follower_id: current_user.id )
      follow.destroy
    redirect_to user_url(user_to_unfollow)
  end
end
