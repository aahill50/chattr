class Api::FeedsController < ApplicationController
  before_filter :require_signed_in
  
  def main
    render :main
  end
  
  def require_signed_in
    render(json: "Page not found", status: 404) if !signed_in?
  end
end