class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActionController::RoutingError, with: :route_not_found

  def not_found
    render json: { error: "Recurso não encontrado." }, status: :not_found
  end

  def route_not_found
    render json: { error: "Rota inválida." }, status: :not_found
  end
end
