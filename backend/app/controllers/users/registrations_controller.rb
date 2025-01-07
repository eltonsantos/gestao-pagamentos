# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  include RackSessionsFix
  
  respond_to :json

  def create
    if current_user&.admin?
      user = User.new(user_params)
      user.role = :seller

      if user.save
        render json: {
          status: {code: 200, message: 'User created successfully.'},
          data: UserSerializer.new(user).serializable_hash[:data][:attributes]
        }
      else
        render json: {
          status: {message: "User couldn't be created successfully. #{user.errors.full_messages.to_sentence}"}
        }, status: :unprocessable_entity
      end
    else
      render json: {
        status: {message: 'You are not authorized to create users.'}
      }, status: :unauthorized
    end
  end

  private

  def respond_with(current_user, _opts = {})
    if resource.persisted?
      render json: {
        status: {code: 200, message: 'Signed up successfully.'},
        data: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
      }
    else
      render json: {
        status: {message: "User couldn't be created successfully. #{current_user.errors.full_messages.to_sentence}"}
      }, status: :unprocessable_entity
    end
  end

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :name)
  end
end
