class EmailChangesController < ApplicationController

  def edit
    email_to_verify = params[:email]
    user = User.find_by(email_to_verify: email_to_verify)
    if user && user.authenticated?(:email_change, params[:id])
      user.execute_email_change unless user.email_change_expired?
    end
    redirect_to root_path
  end

end
