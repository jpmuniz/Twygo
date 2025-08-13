FROM ruby:3.4

# Diretório da app dentro do container
WORKDIR /var/app

# Instalar dependências do sistema, incluindo sqlite3 e nodejs (para assets)
RUN apt-get update -qq && apt-get install -y \
  build-essential \
  libsqlite3-dev \
  sqlite3 \
  nodejs \
  && rm -rf /var/lib/apt/lists/*

# Definir local para gems instaladas
ENV BUNDLE_PATH=/usr/local/bundle

# Copiar Gemfile e Gemfile.lock antes para cache do docker
COPY Gemfile Gemfile.lock ./

# Instalar gems
RUN bundle install -j4

# Copiar código fonte
COPY . .

# Comando padrão para rodar o servidor Rails
CMD rm -f tmp/pids/server.pid && ./bin/rails server -b 0.0.0.0
