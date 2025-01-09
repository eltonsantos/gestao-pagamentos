# frozen_string_literal: true

class UsersController < ApplicationController
  def index
    @users = User.includes(:commission).where(role: :seller)
    puts @users.to_json(include: :commission)
    render json: @users, each_serializer: UserSerializer
  end
end