module Api
  class UsersController < ApiController
    def index
      @users = User.all
      render :index
    end
    
    def show
      @user = User.find(params[:id])
      render :show
    end

    def current
      render :current_user
    end
  end
end