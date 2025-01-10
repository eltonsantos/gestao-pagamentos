class CustomersController < ApplicationController
  def index
    @customers = Customer.all
    render json: @customers
  rescue StandardError => e
    Rails.logger.error("Erro ao buscar clientes: #{e.message}")
    render json: { error: "Erro ao buscar clientes" }, status: :internal_server_error
  end
end
