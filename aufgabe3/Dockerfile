FROM ubuntu:14.04.4

RUN apt-get update && apt-get install -y net-tools \
    openssh-server \
    build-essential \
   apache2 \
   nodejs \
   patch \
   libssl-dev \
   libyaml-dev \
   libreadline-dev \
   openssl \
   curl \
   git-core \
   zlib1g-dev \
   bison \
   libxml2-dev \
   libxslt1-dev \
   libcurl4-openssl-dev \
   libsqlite3-dev \
   sqlite3 \
   git-core \
   python-software-properties \
   libffi-dev



# install and activate passenger
RUN echo "deb https://oss-binaries.phusionpassenger.com/apt/passenger trusty main" > /etc/apt/sources.list.d/passenger.list
RUN apt-get install -y apt-transport-https ca-certificates
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7
RUN apt-get update && apt-get install -y libapache2-mod-passenger

# enable apache config
COPY ./config/apache/rails.conf /etc/apache2/sites-available/
RUN a2enmod passenger
RUN a2enmod ssl
RUN a2dissite 000-default
RUN a2ensite rails

ENV HOME /root
WORKDIR $HOME

# copy ssl files on container
COPY ./certs/ /certs/

# install ruby 2.3.1
RUN wget http://ftp.ruby-lang.org/pub/ruby/2.3/ruby-2.3.1.tar.gz
RUN tar -xzvf ruby-2.3.1.tar.gz
WORKDIR $HOME/ruby-2.3.1/
RUN ./configure
RUN make
RUN make install

# Install gems
ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME
ENV RAILS_ENV production
RUN gem install bundler
COPY Gemfile* $APP_HOME/
#RUN bundle install --without development test --with production
RUN bundle install

# Upload and load source
COPY . $APP_HOME
RUN bundle exec rake db:migrate --trace

# Start server
EXPOSE 22 80 443

# set up ssh
RUN mkdir /var/run/sshd
COPY authorized_keys /root/.ssh/authorized_keys

# give access to cache folder
# RUN mkdir /app/tmp
RUN chmod -R 777 /app/tmp

RUN chmod +x start.sh
CMD ["./start.sh"]
