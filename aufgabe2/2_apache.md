# Apache
Vorgaenger: [1_ubuntu_image.md](1_ubuntu_image.md)
### Precondition
* Ans VPN verbunden
* Ueber ssh aufm Container

## 2b - Installation von Apache
```bash
# installation von apache
apt-get install apache2

# starten des dienstes (deamon)
# Besuche auf deinen lokalen Rechner die IP per Browser.
service apache2 start

# aendern der index.html
vim /var/www/html/index.html
```

## 2c - Zertifikate generieren

* https://wiki.ubuntuusers.de/CA/
* http://manual.seafile.com/deploy/https_with_apache.html
* https://thomas-leister.de/internet/eine-eigene-openssl-ca-erstellen-und-zertifikate-ausstellen/
* https://datacenteroverlords.com/2012/03/01/creating-your-own-ssl-certificate-authority/
* https://blog.didierstevens.com/2008/12/30/howto-make-your-own-cert-with-openssl/

```bash
# ca-cert erzeugen
openssl genrsa -out root.key 2048
openssl req -new -x509 -key root.key -out root.crt -days 10000


# sub ca-cert erzeugen
openssl genrsa -out sub.key 2048
openssl req -new -key sub.key -out sub.csr
openssl x509 -req -in sub.csr -CA root.crt -CAkey root.key -CAcreateserial -out sub.crt -days $((4*7)) -sha256

# apache cert erzeugen
openssl genrsa -out apache.key 2048
openssl req -new -key apache.key -out apache.csr
openssl x509 -req -in apache.csr -CA sub.crt -CAkey sub.key -CAcreateserial -out apache.crt -days $((4*7)) -sha256
```

## 2d - Apache absichern

* [000-default.conf](000-default.conf)

```bash
# SSL auf apache aktivieren
a2enmod ssl
service apache2 restart

# Bearbeite die virtuellen hosts. Es muessen am ende zwei vorhanden sein.
vim /etc/apache2/sites-enabled/000-default.conf
 
```
