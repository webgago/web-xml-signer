require 'rubygems'
require 'bundler/setup'

require 'sinatra'

Bundler.require(:default, settings.environment)

def prepare_xml(xml)
  doc = Nokogiri.XML(xml) do |config|
    config.default_xml.noblanks
  end
  root_node = doc.root
  root_node.to_xml(save_with: Nokogiri::XML::Node::SaveOptions::AS_XML, encoding: 'UTF-8')
end

set :server, %w[thin webrick]

get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end

post '/prepare_signed_info' do
  xmldsign_document = Xmldsign::Document.string(prepare_xml(params[:xml]))
  signature = xmldsign_document.signature
  signature.fill_digest!
  signature.c14n_signed_info
end

post '/insert_signature_and_certificate' do
  xmldsign_document = Xmldsign::Document.string(prepare_xml(params[:xml]))
  xmldsign_document.signature.fill_digest!
  signature_value_node = xmldsign_document.find_first('.//ds:SignatureValue')
  signature_value_node.content = params[:signature_value]
  x509_certificate_node = xmldsign_document.find_first('.//ds:X509Certificate')
  x509_certificate_node.content = params[:x509_certificate]
  xmldsign_document.to_s
end
