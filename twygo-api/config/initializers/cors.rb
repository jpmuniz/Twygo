Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*' # em produção, trocar pelo domínio do frontend!
    resource '/api/*', headers: :any, methods: %i[get post put patch delete options head], expose: ['Authorization']
  end
end