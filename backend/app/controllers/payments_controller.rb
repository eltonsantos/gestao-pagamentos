class PaymentsController < ApplicationController
  respond_to :json
  
  # GET /payments
  def index
    @payments = Payment.all
    @sellers = User.where(role: :seller)

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
      total_pages: @payments.total_pages,
      current_page: @payments.current_page,
      status_names: Payment.statuses,
      sellers: User.where(role: :seller).select(:id, :name)
    }
  end

  def create
    @payment = Payment.new(payment_params)
    @payment.status = :pending

    if @payment.save
      render json: @payment.as_json(include: { 
        customer: { only: [:name, :email, :phone] },
        user: { only: [:name], include: { commission: { only: [:percentage] } } }
      }), status: :created
    else
      render json: { errors: @payment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def payment_params
    params.require(:payment).permit(
      :value,
      :gateway,
      :user_id,
      :customer_id
    )
  end
end
