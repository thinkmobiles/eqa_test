Devise.setup do |config|
  config.mailer_sender = 'please-change-me-at-config-initializers-devise@example.com'
  config.secret_key = ENV['DEVISE_SECRET_KEY']

  require 'devise/orm/active_record'

  config.case_insensitive_keys = [:email]
  config.strip_whitespace_keys = [:email]
  config.skip_session_storage = [:http_auth]
  config.stretches = Rails.env.test? ? 1 : 11
  config.reconfirmable = true
  config.expire_all_remember_me_on_sign_out = true
  config.password_length = 6..128
  config.email_regexp = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/
  config.reset_password_within = 6.hours
  config.sign_out_via = :delete

  require "omniauth-facebook"
  require "omniauth-google-oauth2"
  require 'omniauth-linkedin-oauth2'

  HOST = 'https://'.concat(Rails.application.config.host_name)
                   .concat('/users/auth/')

  unless Rails.env.standalone?

    config.omniauth :facebook,
                    ENV['SECRET_FACEBOOK_ID'],
                    ENV['SECRET_FACEBOOK_KEY'],
                    callback_url: HOST + "facebook/callback",
                    secure_image_url: true

    config.omniauth :google_oauth2,
                    ENV['SECRET_GOOGLE_ID'],
                    ENV['SECRET_GOOGLE_KEY'],
                    image_aspect_ratio: 'original',
                    redirect_uri: HOST + "google_oauth2/callback",
                    provider_ignores_state: true,
                    prompt: 'select_account'

    config.omniauth :linkedin,
                    ENV['SECRET_LINKEDIN_ID'],
                    ENV['SECRET_LINKEDIN_KEY'],
                    callback_url: HOST + "linkedin/callback"
  end
end
