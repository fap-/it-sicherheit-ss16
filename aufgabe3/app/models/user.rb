class User < ActiveRecord::Base

  before_create :create_activation_digest
  attr_accessor :activation_token, :reset_token
  attr_accessor :email_change_token
  after_initialize :set_default_is_admin
	before_save { 
    self.email = email.downcase 
    self.email_to_verify = email_to_verify.downcase if email_to_verify
  }

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
  has_secure_password
  validates :password, presence: true, 
                       length: { minimum: 6 },
                       if: :password
                  

  def start_activation
    update_attribute(:activation_started,    Time.zone.now)
  end

  def activate
    # check 30min threshold
		if (activation_started + 30.minutes).before? Time.zone.now
      destroy
			false
		else
    	update_attribute(:activated,    true)
  	  update_attribute(:activated_at, Time.zone.now)
			true
		end
  end

  def password_reset_expired?
    reset_started < 30.minutes.ago
  end

  def authenticated?(attribute, token)
    digest = send("#{attribute}_digest")
    return false if digest.nil?
    BCrypt::Password.new(digest).is_password?(token)
  end

  def self.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  # Returns a random token.
  def self.new_token
    SecureRandom.urlsafe_base64
  end

  def create_reset_digest
    self.reset_token = User.new_token
    update_columns(reset_digest:  User.digest(reset_token),
                   reset_started: Time.zone.now)
  end

  def start_email_change
    self.email_change_token = User.new_token
    update_attribute(:email_change_digest, User.digest(email_change_token))
    update_attribute(:email_change_at, Time.zone.now)
  end

  def email_changed?
    email != email_to_verify
  end

  def email_change_expired?
    email_change_at < 30.minutes.ago
  end

  def execute_email_change
    update_attribute(:email, email_to_verify)
  end

 private

  def create_activation_digest
    self.activation_token = User.new_token
    self.activation_digest = User.digest(activation_token)
  end

  def set_default_is_admin
    self.is_admin ||= false
  end

end
