require 'rubygems'
require 'bundler/setup'

require 'sinatra'

Bundler.require(:default, settings.environment)

get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end
