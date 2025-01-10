# frozen_string_literal: true

class UsersController < ApplicationController
  def index
    @users = User.includes(:commission).where(role: :seller)
    render json: @users, include: :commission
  end

  def create
    @user = User.new(user_params)
    @user.role = :seller
    
    User.transaction do
      if @user.save
        commission = Commission.create!(
          user: @user, 
          percentage: params[:user][:commission_percentage]
        )
        render json: @user, include: :commission, status: :created
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.message }, status: :unprocessable_entity
  end

  def update
    @user = User.find(params[:id])
    
    if @user.update(user_params)
      @user.commission.update(percentage: params[:commission_percentage]) if params[:commission_percentage]
      render json: @user, include: :commission
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find(params[:id])
    render json: @user, include: :commission
  end

  def current
    render json: current_user, include: :commission
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :commission_percentage)
  end

  def require_admin
    unless current_user.admin?
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end
end