# frozen_string_literal: true

class UsersController < ApplicationController
  def index
    @users = User.includes(:commission).where(role: :seller)
    render json: @users, include: :commission
  end
end