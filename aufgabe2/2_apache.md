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

```
openssl genrsa -out privkey.pem 2048
openssl req -new -x509 -key privkey.pem -out cacert.pem -days $((4 * 7))
```

## 2d

## 2e
