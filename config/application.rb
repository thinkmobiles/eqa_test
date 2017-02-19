require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module QualityDashboard
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.without_whitespaces = /\A\S*\z/s
    config.to_prepare { Devise::SessionsController.respond_to :js, only: :create }
    config.locales = [['EN', 'en'], ['EG', 'eg']]

    config.generators do |g|
      g.test_framework :rspec,
      fixtures: true,
      view_specs: false,
      helper_specs: false,
      routing_specs: true,
      controller_specs: true,
      request_specs: false
      g.fixture_replacement :factory_girl, dir: "spec/factories"
    end
    config.eager_load_paths += %W( #{config.root}/lib/presenter_modules )

    config.after_initialize do
      load Rails.root + 'db/seeds.rb' if ENV['RACK_ENV']
    end

    def self.require_deep(folder_path)
      requires_failed = []
      Dir[folder_path + '/**/*.rb'].each do |f|
        begin
          require f
        rescue
          requires_failed << f
        end
      end
      requires_failed.each { |f| require f }
    end

    require_deep './app/services'
    require_deep './app/workers/concerns'
  end
end
