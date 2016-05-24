class UsersController < ApplicationController
  include SessionsHelper
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :check_admin_only_permission, only: [:index, :new, :create, :destroy]
  before_action :check_permission, only: [:show, :edit, :update]

  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        @user.start_activation
        UserMailer.account_activation(@user).deliver_now
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render :show, status: :created, location: @user }

      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end


  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      user_dup = delete_password_if_blank(user_params)
      if @user.update_attributes(user_dup)
        msgs = []
        msgs << 'User was successfully updated.'
        if @user.email_changed?
          start_email_verification 
          msgs << 'Check up your new email.'
        end
        format.html { redirect_to @user, notice: msgs }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def delete_password_if_blank(user_params)
      user_dup = user_params.dup
      if user_params[:password].empty? && user_params[:password_confirmation].empty?
        user_dup.delete(:password) 
        user_dup.delete(:password_confirmation) 
      end
      user_dup
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      permitted_params = [:email, :password, :password_confirmation, :email_to_verify]
      permitted_params << :is_admin if current_user.is_admin? 
      params.require(:user).permit(*permitted_params)
    end

    def check_admin_only_permission
      if !logged_in? || !current_user.is_admin
        redirect_to login_path        
      end
    end

    # ensures
    #   - current_user is logged in
    #   - current_user is editing himself or is_admin
    def check_permission
      redirect_to login_path unless logged_in?
      redirect_to login_path unless current_user.is_admin || @user.id == current_user.id 
    end
    
    def start_email_verification
      @user.start_email_change
      UserMailer.email_change(@user).deliver_now
    end
end
