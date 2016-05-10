class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.account_activation.subject
  #
  def account_activation(user)
    @user = user

    mail to: @user.email, subject: "Aufgabe3 - Activation"
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.password_reset.subject
  #
  def password_reset(user)
    @user = user

    mail to: @user.email, subject: "Aufgabe3 - Password reset"
  end

  def email_change(user)
    @user = user

    mail to: @user.email_to_verify, subject: "Aufgabe3 - Email Change"
  end
end
