FROM php:5.6-apache

RUN apt-get -y update
RUN apt-get -y install vim

# install ssh
RUN apt-get -y install openssh-server
RUN mkdir /var/run/sshd
COPY authorized_keys /root/.ssh/authorized_keys

# install ssl and php sources
RUN a2enmod ssl
COPY apache.conf /etc/apache2/sites-available/000-default.conf
RUN a2ensite 000-default
COPY src/ /var/www/html/
COPY certs /certs

COPY start.sh /start.sh
CMD ["/start.sh"]
