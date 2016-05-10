class SessionsController < ApplicationController
  include SessionsHelper

	def new
	end

  def create
		user = User.find_by(email: params[:session][:email].downcase)
		password = params[:session][:password]
    if user && user.activated && user.authenticate(password)
			login user
			redirect_to root_path
    else
      flash[:danger] = 'Invalid email/password combination' 
      render 'new'
    end
  end

	def destroy
		logout
    redirect_to login_path
	end

end
