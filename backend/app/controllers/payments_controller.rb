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

    @payments = @payments.includes(:user, :customer).page(params[:page]).per(10)

    total_value = @payments.sum(:value).to_f

    render json: {
      payments: @payments.as_json(include: { 
        customer: { only: [:name, :email, :phone] },
        user: { only: [:name], include: { commission: { only: [:percentage] } } }
      }, methods: [:status, :gateway]),
      total_value: total_value,
      status_names: Payment.statuses,
      sellers: User.where(role: :seller).select(:id, :name)
    }
  end
end
