# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  include RackSessionsFix
  
  respond_to :json

  def create
    self.resource = warden.authenticate!(auth_options)
    sign_in(resource_name, resource)
    respond_with(resource)
  end

  private

  def respond_with(current_user, _opts = {})
    if current_user.persisted?
      token = current_user.generate_jwt_token
      render json: {
        status: { 
          code: 200, 
          message: 'Logged in successfully.',
          data: {
            user: UserSerializer.new(current_user).serializable_hash[:data][:attributes],
            token: token
          }
        }
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Invalid email or password"
      }, status: :unauthorized
    end
  end

  def respond_to_on_destroy
    if request.headers['Authorization'].present?
      jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last, Rails.application.credentials.devise_jwt_secret_key!).first
      current_user = User.find(jwt_payload['sub'])
    end
    
    if current_user
      render json: {
        status: 200,
        message: 'Logged out successfully.'
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end
end
