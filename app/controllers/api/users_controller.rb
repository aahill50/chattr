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
      @user = User.find(params[:id])
      if @user.update(user_params)
        head :ok
      else
        render text: "Update failed", status: :unprocessable_entity
      end
    end

    def current
      render :current_user
    end

    def search
      search_str = params[:search][:string]
      @found_users = User.search_for(search_str)
      render :search_results
    end
    
    private
    def user_params
      params.require(:user).permit(:bio, :avatar_url)
    end
  end
end
