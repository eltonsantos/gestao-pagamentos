class PaymentsController < ApplicationController
  # GET /payments
  def index
    @payments = Payment.all

    if params[:start_date].present? && params[:end_date].present?
      @payments = @payments.where(created_at: params[:start_date]..params[:end_date])
    end

    if params[:status].present?
      @payments = @payments.where(status: params[:status])
    end

    if params[:gateway].present?
      @payments = @payments.where(gateway: params[:gateway])
    end

    if params[:seller_id].present?
      @payments = @payments.where(user_id: params[:seller_id])
    end

    @payments = @payments.page(params[:page]).per(10)

    render json: @payments, include: [:customer, :user]
  end
end
