module Api
  class SessionsController < ApplicationController
    def new
      @user = User.new
      render :new
    end

    def create
      username = params[:user][:username]
      password = params[:user][:password]
      user = User.find_by_credentials(username, password)

      if user
        sign_in!(user)
        render json: user
      else
        render text: "Unable to sign in", status: :unprocessable_entity
      end
    end

    def destroy
      sign_out!
      render text: "signed out successfully"
    end
  end
end
