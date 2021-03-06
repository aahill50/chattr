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
    
    def update
      password = params[:user][:password]
      password_conf = params[:user][:password_confirmation]
      
      if params[:user][:avatar_url] || [:user][:banner_url]
        current_user.update(avatar_url: params[:user][:avatar_url],
                            banner_url: params[:user][:banner_url])
        render json: current_user
      elsif params[:user][:banner_url]
        current_user.update(banner_url: params[:user][:banner_url])
        render json: current_user
      elsif current_user.is_password?(password) && current_user.is_password?(password_conf)
        if current_user.update(user_params)
          render json: current_user
        end
      else
        render text: "Unable to update with those credentials", status: :unprocessable_entity
      end
    end

    def current
      render :current_user
    end

    private
    def user_params
      params.require(:user).permit(:bio, :avatar_url, :banner_url)
    end
  end
end
