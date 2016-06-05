FROM php:5.6-apache
#COPY default.conf /etc/apache2/sites-available/default
COPY src/ /var/www/html/
COPY certs /certs
RUN a2enmod ssl
RUN service apache2 restart

