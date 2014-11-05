module Api
  class ApiController < ApplicationController
    before_action :require_signed_in!

    def require_signed_in!
      unless signed_in?
          render text: "not signed in", status: 302
      end
    end
  end
end
