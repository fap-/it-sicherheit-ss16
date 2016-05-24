FROM ruby:2.3.1

RUN apt-get update && apt-get install -y net-tools \
    openssh-server \
    build-essential 
#    apache2 \
#    nodejs \
#    patch \
#    libssl-dev \
#    libyaml-dev \
#    libreadline-dev \
#    openssl \
#    curl \
#    git-core \
#    zlib1g-dev \
#    bison \
#    libxml2-dev \
#    libxslt1-dev \
#    libcurl4-openssl-dev \
#    libsqlite3-dev \
#    sqlite3

# install and activate passenger
#RUN echo "deb https://oss-binaries.phusionpassenger.com/apt/passenger trusty main" > /etc/apt/sources.list.d/passenger.list
#RUN apt-get install -y apt-transport-https ca-certificates
#RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7
#RUN apt-get update && apt-get install -y libapache2-mod-passenger

# Install gems
ENV APP_HOME /app
ENV HOME /root
RUN mkdir $APP_HOME
WORKDIR $APP_HOME
COPY Gemfile* $APP_HOME/
RUN gem install bundler
RUN bundle install --without development test --with production
ENV RAILS_ENV production
#RUN bundle exec rake db:migrate

# Upload and load source
COPY . $APP_HOME
RUN mkdir /var/run/sshd
COPY authorized_keys /root/.ssh/authorized_keys
RUN chmod -R 777 /app/tmp

# Start server
EXPOSE 22 80 443

# enable apache config
#COPY ./config/apache/rails.conf /etc/apache2/sites-available/
#RUN a2enmod passenger
#RUN a2dissite 000-default
#RUN a2ensite rails
# restart apache
#RUN service apache2 restart
CMD ["/usr/sbin/sshd", "-D"]
