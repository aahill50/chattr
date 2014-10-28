class UsersController < ApplicationController
  before_filter :require_signed_in, only: [:edit, :update]

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

  private
  def user_params
    params.require(:user).permit(:username, :fullname, :password, :email, :bio)
  end
end
