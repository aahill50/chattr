class UsersController < ApplicationController
  before_filter :require_signed_in, except: [:new, :create]

  def index
    @users = User.all
    render :index
  end

  def new
    @user = User.new
    render :new
  end

  def edit
    @user = current_user
    render :edit
  end

  def show
    @user = User.find(params[:id])
    @profile_type = 'posts'
    render :show
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
      redirect_to posts_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def update
    username = params[:user][:username]
    password = params[:user][:password]
    password_confirmation = params[:user][:password_confirmation]

    @user = User.find(params[:id])

    if @user.is_password?(password) && password == password_confirmation
      if @user.update(user_params)
        redirect_to @user
        flash[:notice] = ["User profile has been updated"]
      else
        flash.now[:errors] = @user.errors.full_messages
      end
    elsif !@user.is_password?(password) || !@user.is_password?(password_confirmation)
      flash.now[:errors] = ["Unable to confirm password"]
      render :edit
    else
      flash.now[:errors] = ["Unable to update profile"]
      render :edit
    end
  end

  def search
    search_str = params[:search][:string]
    @found_users = User.search_for(search_str)
    render 'shared/search_results'
  end

  def profile_following
    @user = User.find(params[:id])
    @profile_type = 'following'
    render :show
  end

  def profile_followers
    @user = User.find(params[:id])
    @profile_type = 'followers'
    render :show
  end

  def profile_favorite_posts
    @user = User.find(params[:id])
    @profile_type = 'favorite_posts'
    render :show
  end

  private
  def user_params
    params.require(:user).permit(:username, :fullname, :password, :email, :bio)
  end
end
