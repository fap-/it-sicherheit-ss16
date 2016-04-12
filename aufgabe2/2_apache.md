# Installation von apache

### Precondition
* VPN steht
* SSH Zugriff auf das ubuntu image in der docker Umgebung

### 2b
```bash
# installation von apache
apt-get install apache2

# starten des dienstes (deamon)

service apache2 start
# jetzt kann bereits mit dem browser die standart 
# apache site eingesehen werden

# aendern der index.html
vim /var/www/html/index.html

```
