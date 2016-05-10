class AccountActivationsController < ApplicationController
  include SessionsHelper

  def edit
    user = User.find_by(email: params[:email])
    if user && !user.activated? && user.authenticated?(:activation, params[:id])
			if user.activate
      	flash[:success] = "Account activated!"
			else 	
      	flash[:danger] = "Link expired" 
			end
      redirect_to root_path
    else
      flash[:danger] = "Invalid activation link"
      redirect_to root_path
    end
  end
end
