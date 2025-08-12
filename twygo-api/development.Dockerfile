FROM ruby:3.4

USER root

WORKDIR /var/app

RUN gem update --system

COPY Gemfile .

COPY Gemfile.lock .

RUN bundle install -j4

CMD ["./bin/rails", "server", "-b", "0.0.0.0"]