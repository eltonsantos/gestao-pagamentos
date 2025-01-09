class ApplicationController < ActionController::API
  include ActionController::MimeResponds

  respond_to :json 
  
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def authenticate_user!
    if request.headers['Authorization'].present?
      token = request.headers['Authorization'].split(' ').last
      begin
        decoded_token = JWT.decode(token, Rails.application.credentials.devise_jwt_secret_key!).first
        @current_user = User.find(decoded_token['sub'])
      rescue JWT::DecodeError => e
        render json: { error: 'Invalid token' }, status: :unauthorized
      end
    else
      render json: { error: 'Token missing' }, status: :unauthorized
    end
  end
  
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name role])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[name role])
  end
end
