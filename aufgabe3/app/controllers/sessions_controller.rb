class SessionsController < ApplicationController
  include SessionsHelper

	def new
	end

  def create
		user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
			login user
			redirect_to root_path
    else
      flash[:danger] = 'Invalid email/password combination' # Not quite right!
      render 'new'
    end
  end

	def destroy
		logout
    redirect_to login_path
	end

end
