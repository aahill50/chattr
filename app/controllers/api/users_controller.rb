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

    def search
      search_str = params[:search][:string]
      @found_users = User.search_for(search_str)
      render :search_results
    end
  end
end
