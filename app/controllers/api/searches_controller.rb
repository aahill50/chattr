module Api
  class SearchesController < ApiController
    def search
      search_str = params[:search][:string]
      @found_users = User.search_for(search_str)
      @found_hashtags = Hashtag.search_for(search_str)
      render :search_results
    end
  end
end