class PaymentsController < ApplicationController
  respond_to :json
  
  # GET /payments
  def index
    @payments = if current_user.admin?
      Payment.all
    else
      current_user.payments
    end

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
      sellers: current_user.admin? ? User.where(role: :seller).select(:id, :name) : []
    }
  end

  def create
    @payment = Payment.new(payment_params)

    unless current_user.admin?
      @payment.user_id = current_user.id
    end

    @payment.status = Payment.statuses.keys.sample.to_sym
    # @payment.status = :pending

    if @payment.save
      render json: @payment.as_json(include: { 
        customer: { only: [:name, :email, :phone] },
        user: { only: [:name], include: { commission: { only: [:percentage] } } }
      }), status: :created
    else
      render json: { errors: @payment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @payment = Payment.find_by(id: params[:id])

    if @payment
      render json: @payment.as_json(
        include: {
          customer: { only: [:name, :email, :phone] },
          user: { only: [:name], include: { commission: { only: [:percentage] } } }
        }, 
        methods: [:status, :gateway]
      )
    else
      render json: { error: "Pagamento não encontrado" }, status: :not_found
    end
  end

  def top_selling_sellers
    if current_user.admin?
      @sellers = Payment.where(status: :approved)
                        .group(:user_id)
                        .select('user_id, SUM(value) as total_sales')
                        .order('total_sales DESC')
                        .limit(5)
                        .includes(:user)
  
      render json: @sellers.map { |payment| { name: payment.user.name, total_sales: payment.total_sales } }
    end
  end

  def sales_by_date
    if current_user.admin?
      @sales_by_date = Payment.where(status: [:approved, :pending, :failed])
                              .group("DATE(created_at)")
                              .select("DATE(created_at) as date, COUNT(*) as sales_count, SUM(value) as total_sales")
                              .order("date")
    
      render json: @sales_by_date.map { |payment| 
        {
          date: payment.date.strftime('%d/%m/%y'),
          sales_count: payment.sales_count,
          total_sales: payment.total_sales
        }
      }
    end
  end

  private

  def payment_params
    if current_user.admin?
      params.require(:payment).permit(
        :value,
        :gateway,
        :user_id,
        :customer_id
      )
    else
      params.require(:payment).permit(
        :value,
        :gateway,
        :customer_id
      )
    end
  end
end
